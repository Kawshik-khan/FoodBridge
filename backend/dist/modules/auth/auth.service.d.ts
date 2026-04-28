import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma/prisma.service';
import { BruteForceService } from '../../common/services/brute-force.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private bruteForce;
    private notifications;
    constructor(prisma: PrismaService, jwt: JwtService, bruteForce: BruteForceService, notifications: NotificationsService);
    private accessSecret;
    private refreshSecret;
    private accessExpiry;
    private refreshExpiry;
    private issueTokens;
    register(dto: RegisterDto): Promise<{
        userId: string;
        email: string;
        verified: boolean;
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        verified: boolean;
    }>;
    validateUser(email: string, password: string, ip?: string): Promise<{
        id: string;
        createdAt: Date;
        fullName: string;
        email: string;
        password: string;
        phone: string | null;
        role: string;
        avatar: string | null;
        verified: boolean;
        isBanned: boolean;
        trustScore: number;
        address: string | null;
        latitude: number | null;
        longitude: number | null;
    }>;
    login(dto: LoginDto, meta?: {
        ip?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    logout(refreshToken: string): Promise<{
        ok: boolean;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        ok: boolean;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    cleanupExpiredTokens(): Promise<number>;
    me(userId: string): Promise<any>;
    private sanitizeUser;
    private verifyRefreshToken;
}
