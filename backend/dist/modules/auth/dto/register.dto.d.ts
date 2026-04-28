import { Role } from '../../../common/enums/role.enum';
export declare class RegisterDto {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role?: Role;
}
