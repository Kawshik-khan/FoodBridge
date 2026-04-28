import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PrismaService } from '../../common/prisma/prisma.service'
import { BruteForceService } from '../../common/services/brute-force.service'
import { NotificationsModule } from '../notifications/notifications.module'

@Module({
  imports: [PassportModule, JwtModule.register({}), NotificationsModule],
  providers: [AuthService, PrismaService, JwtStrategy, BruteForceService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
