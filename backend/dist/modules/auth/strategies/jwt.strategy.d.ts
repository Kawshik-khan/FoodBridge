import { Strategy } from 'passport-jwt';
import { AuthPayload } from '../interfaces/auth-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: AuthPayload): Promise<{
        userId: string;
        role: import("../../../common/enums/role.enum").Role;
        sessionId: string;
    }>;
}
export {};
