import { UsersService } from './users.service';
import { UpdateMeDto } from './dto/update-me.dto';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    me(userId: string): Promise<{
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
    updateMe(userId: string, body: UpdateMeDto): Promise<{
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
    get(id: string): Promise<{
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
}
