import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(body: RegisterDto): Promise<{
        userId: string;
        email: string;
        verified: boolean;
    }>;
    login(body: LoginDto, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refresh(body: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    logout(body: RefreshDto): Promise<{
        ok: boolean;
    }>;
    forgotPassword(body: ForgotPasswordDto): Promise<{
        ok: boolean;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        ok: boolean;
    }>;
    verifyEmail(body: VerifyEmailDto): Promise<{
        verified: boolean;
    }>;
    me(userId: string): Promise<any>;
}
