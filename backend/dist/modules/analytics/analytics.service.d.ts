import { PrismaService } from '../../common/prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    overview(): Promise<{
        totalDonations: number;
        completedPickups: number;
        activeUsers: number;
        mealsSaved: number;
    }>;
    donations(): Promise<{
        date: Date;
        status: string;
    }[]>;
    users(): Promise<{
        date: Date;
        role: string;
        verified: boolean;
    }[]>;
    impact(): Promise<{
        mealsSaved: number;
        topCities: {
            city: string;
            count: number;
        }[];
        growthChart: {
            date: Date;
            value: number;
        }[];
    }>;
}
