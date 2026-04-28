import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { randomBytes, createHash } from 'crypto'
import { PrismaService } from '../../common/prisma/prisma.service'
import { BruteForceService } from '../../common/services/brute-force.service'
import { NotificationsService } from '../notifications/notifications.service'
import { Role } from '../../common/enums/role.enum'
import { AuthPayload } from './interfaces/auth-payload.interface'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshDto } from './dto/refresh.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { VerifyEmailDto } from './dto/verify-email.dto'

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private bruteForce: BruteForceService,
    private notifications: NotificationsService
  ) {}

  private accessSecret = process.env.JWT_ACCESS_SECRET || 'access-secret'
  private refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret'
  private accessExpiry = process.env.JWT_ACCESS_EXPIRY || '15m'
  private refreshExpiry = process.env.JWT_REFRESH_EXPIRY || '7d'

  private async issueTokens(userId: string, role: Role, sessionId: string) {
    const payload: AuthPayload = { sub: userId, role, sid: sessionId }
    const accessToken = await this.jwt.signAsync(payload, { secret: this.accessSecret, expiresIn: this.accessExpiry })
    const refreshToken = await this.jwt.signAsync(payload, { secret: this.refreshSecret, expiresIn: this.refreshExpiry })
    return { accessToken, refreshToken }
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (existing) throw new ConflictException('Email already registered')

    const password = await bcrypt.hash(dto.password, 12)
    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        password,
        role: dto.role || Role.RECEIVER,
        verified: false
      }
    })

    const rawToken = randomBytes(32).toString('hex')
    await this.prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: sha256(rawToken),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
      }
    })

    await this.notifications.enqueueEmail(
      user.email,
      'Verify your FoodBridge account',
      `<p>Welcome ${user.fullName}. Verify your email with this token: <strong>${rawToken}</strong></p>`
    )

    return { userId: user.id, email: user.email, verified: user.verified }
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const tokenHash = sha256(dto.token)
    const record = await this.prisma.verificationToken.findFirst({
      where: { token: tokenHash, expiresAt: { gt: new Date() } }
    })
    if (!record) throw new UnauthorizedException('Invalid verification token')

    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: record.userId }, data: { verified: true } }),
      this.prisma.verificationToken.deleteMany({ where: { userId: record.userId } })
    ])

    return { verified: true }
  }

  async validateUser(email: string, password: string, ip = 'unknown') {
    const blockedUntil = await this.bruteForce.isBlocked(`login:${email}:${ip}`)
    if (blockedUntil) throw new UnauthorizedException(`Too many attempts. Try again after ${blockedUntil.toISOString()}`)

    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      await this.bruteForce.registerFailure(`login:${email}:${ip}`)
      throw new UnauthorizedException('Invalid credentials')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      await this.bruteForce.registerFailure(`login:${email}:${ip}`)
      throw new UnauthorizedException('Invalid credentials')
    }

    await this.bruteForce.clear(`login:${email}:${ip}`)
    return user
  }

  async login(dto: LoginDto, meta: { ip?: string } = {}) {
    const user = await this.validateUser(dto.email, dto.password, meta.ip)
    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: 'pending',
        deviceInfo: dto.deviceInfo || 'unknown',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      }
    })

    const tokens = await this.issueTokens(user.id, user.role as Role, session.id)
    await this.prisma.session.update({
      where: { id: session.id },
      data: { refreshToken: sha256(tokens.refreshToken) }
    })

    return {
      user: this.sanitizeUser(user),
      ...tokens
    }
  }

  async refresh(dto: RefreshDto) {
    const payload = await this.verifyRefreshToken(dto.refreshToken)
    const session = await this.prisma.session.findUnique({ where: { id: payload.sid } })
    if (!session || session.userId !== payload.sub || session.refreshToken !== sha256(dto.refreshToken)) {
      throw new UnauthorizedException('Invalid session')
    }

    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user) throw new UnauthorizedException('User not found')

    const tokens = await this.issueTokens(user.id, user.role as Role, session.id)
    await this.prisma.session.update({
      where: { id: session.id },
      data: { refreshToken: sha256(tokens.refreshToken), expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) }
    })

    return { user: this.sanitizeUser(user), ...tokens }
  }

  async logout(refreshToken: string) {
    try {
      const payload = await this.verifyRefreshToken(refreshToken)
      await this.prisma.session.deleteMany({ where: { id: payload.sid, userId: payload.sub } })
    } catch {
      // noop - logout should be idempotent
    }
    return { ok: true }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (!user) return { ok: true }

    const rawToken = randomBytes(32).toString('hex')
    const tokenHash = sha256(rawToken)
    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: tokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30)
      }
    })

    // Send reset link instead of raw token
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`
    await this.notifications.enqueueEmail(
      user.email,
      'Reset your FoodBridge password',
      `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 30 minutes.</p>`
    )

    return { ok: true }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = sha256(dto.token)
    const record = await this.prisma.passwordResetToken.findFirst({
      where: { token: tokenHash, expiresAt: { gt: new Date() } }
    })
    if (!record) throw new UnauthorizedException('Invalid reset token')

    const password = await bcrypt.hash(dto.password, 12)
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: record.userId }, data: { password } }),
      this.prisma.passwordResetToken.deleteMany({ where: { userId: record.userId } }),
      this.prisma.session.deleteMany({ where: { userId: record.userId } })
    ])

    return { ok: true }
  }

  async cleanupExpiredTokens() {
    const result = await this.prisma.passwordResetToken.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    })
    console.log(`Cleaned up ${result.count} expired password reset tokens`)
    return result.count
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundException('User not found')
    return this.sanitizeUser(user)
  }

  private sanitizeUser(user: any) {
    const { password, ...rest } = user
    return rest
  }

  private async verifyRefreshToken(token: string) {
    try {
      return await this.jwt.verifyAsync<AuthPayload>(token, { secret: this.refreshSecret })
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
}
