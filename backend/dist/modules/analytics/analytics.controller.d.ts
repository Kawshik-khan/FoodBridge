import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private analytics;
    constructor(analytics: AnalyticsService);
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
