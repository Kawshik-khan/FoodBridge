"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const brute_force_service_1 = require("../../common/services/brute-force.service");
const notifications_service_1 = require("../notifications/notifications.service");
const role_enum_1 = require("../../common/enums/role.enum");
function sha256(value) {
    return (0, crypto_1.createHash)('sha256').update(value).digest('hex');
}
let AuthService = class AuthService {
    constructor(prisma, jwt, bruteForce, notifications) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.bruteForce = bruteForce;
        this.notifications = notifications;
        this.accessSecret = process.env.JWT_ACCESS_SECRET || 'access-secret';
        this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
        this.accessExpiry = process.env.JWT_ACCESS_EXPIRY || '15m';
        this.refreshExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';
    }
    async issueTokens(userId, role, sessionId) {
        const payload = { sub: userId, role, sid: sessionId };
        const accessToken = await this.jwt.signAsync(payload, { secret: this.accessSecret, expiresIn: this.accessExpiry });
        const refreshToken = await this.jwt.signAsync(payload, { secret: this.refreshSecret, expiresIn: this.refreshExpiry });
        return { accessToken, refreshToken };
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
        const password = await bcrypt.hash(dto.password, 12);
        const user = await this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                phone: dto.phone,
                password,
                role: dto.role || role_enum_1.Role.RECEIVER,
                verified: false
            }
        });
        const rawToken = (0, crypto_1.randomBytes)(32).toString('hex');
        await this.prisma.verificationToken.create({
            data: {
                userId: user.id,
                token: sha256(rawToken),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
            }
        });
        await this.notifications.enqueueEmail(user.email, 'Verify your FoodBridge account', `<p>Welcome ${user.fullName}. Verify your email with this token: <strong>${rawToken}</strong></p>`);
        return { userId: user.id, email: user.email, verified: user.verified };
    }
    async verifyEmail(dto) {
        const tokenHash = sha256(dto.token);
        const record = await this.prisma.verificationToken.findFirst({
            where: { token: tokenHash, expiresAt: { gt: new Date() } }
        });
        if (!record)
            throw new common_1.UnauthorizedException('Invalid verification token');
        await this.prisma.$transaction([
            this.prisma.user.update({ where: { id: record.userId }, data: { verified: true } }),
            this.prisma.verificationToken.deleteMany({ where: { userId: record.userId } })
        ]);
        return { verified: true };
    }
    async validateUser(email, password, ip = 'unknown') {
        const blockedUntil = await this.bruteForce.isBlocked(`login:${email}:${ip}`);
        if (blockedUntil)
            throw new common_1.UnauthorizedException(`Too many attempts. Try again after ${blockedUntil.toISOString()}`);
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            await this.bruteForce.registerFailure(`login:${email}:${ip}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            await this.bruteForce.registerFailure(`login:${email}:${ip}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this.bruteForce.clear(`login:${email}:${ip}`);
        return user;
    }
    async login(dto, meta = {}) {
        const user = await this.validateUser(dto.email, dto.password, meta.ip);
        const session = await this.prisma.session.create({
            data: {
                userId: user.id,
                refreshToken: 'pending',
                deviceInfo: dto.deviceInfo || 'unknown',
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            }
        });
        const tokens = await this.issueTokens(user.id, user.role, session.id);
        await this.prisma.session.update({
            where: { id: session.id },
            data: { refreshToken: sha256(tokens.refreshToken) }
        });
        return {
            user: this.sanitizeUser(user),
            ...tokens
        };
    }
    async refresh(dto) {
        const payload = await this.verifyRefreshToken(dto.refreshToken);
        const session = await this.prisma.session.findUnique({ where: { id: payload.sid } });
        if (!session || session.userId !== payload.sub || session.refreshToken !== sha256(dto.refreshToken)) {
            throw new common_1.UnauthorizedException('Invalid session');
        }
        const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const tokens = await this.issueTokens(user.id, user.role, session.id);
        await this.prisma.session.update({
            where: { id: session.id },
            data: { refreshToken: sha256(tokens.refreshToken), expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) }
        });
        return { user: this.sanitizeUser(user), ...tokens };
    }
    async logout(refreshToken) {
        try {
            const payload = await this.verifyRefreshToken(refreshToken);
            await this.prisma.session.deleteMany({ where: { id: payload.sid, userId: payload.sub } });
        }
        catch {
        }
        return { ok: true };
    }
    async forgotPassword(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            return { ok: true };
        const rawToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const tokenHash = sha256(rawToken);
        await this.prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                token: tokenHash,
                expiresAt: new Date(Date.now() + 1000 * 60 * 30)
            }
        });
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
        await this.notifications.enqueueEmail(user.email, 'Reset your FoodBridge password', `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 30 minutes.</p>`);
        return { ok: true };
    }
    async resetPassword(dto) {
        const tokenHash = sha256(dto.token);
        const record = await this.prisma.passwordResetToken.findFirst({
            where: { token: tokenHash, expiresAt: { gt: new Date() } }
        });
        if (!record)
            throw new common_1.UnauthorizedException('Invalid reset token');
        const password = await bcrypt.hash(dto.password, 12);
        await this.prisma.$transaction([
            this.prisma.user.update({ where: { id: record.userId }, data: { password } }),
            this.prisma.passwordResetToken.deleteMany({ where: { userId: record.userId } }),
            this.prisma.session.deleteMany({ where: { userId: record.userId } })
        ]);
        return { ok: true };
    }
    async cleanupExpiredTokens() {
        const result = await this.prisma.passwordResetToken.deleteMany({
            where: { expiresAt: { lt: new Date() } }
        });
        console.log(`Cleaned up ${result.count} expired password reset tokens`);
        return result.count;
    }
    async me(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.sanitizeUser(user);
    }
    sanitizeUser(user) {
        const { password, ...rest } = user;
        return rest;
    }
    async verifyRefreshToken(token) {
        try {
            return await this.jwt.verifyAsync(token, { secret: this.refreshSecret });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        brute_force_service_1.BruteForceService,
        notifications_service_1.NotificationsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map