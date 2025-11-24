import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    forgot(dto: ForgotPasswordDto): Promise<{
        resetToken: string;
    }>;
    reset(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
