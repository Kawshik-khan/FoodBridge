import { PrismaService } from '../../common/prisma/prisma.service';
export declare class RatingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(fromUserId: string, dto: {
        toUserId: string;
        stars: number;
        comment?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        stars: number;
        comment: string | null;
        fromUserId: string;
        toUserId: string;
    }>;
    getByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        stars: number;
        comment: string | null;
        fromUserId: string;
        toUserId: string;
    }[]>;
}
