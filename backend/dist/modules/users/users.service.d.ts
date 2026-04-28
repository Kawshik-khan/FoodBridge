import { PrismaService } from '../../common/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
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
    updateMe(userId: string, dto: any): Promise<{
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
}
