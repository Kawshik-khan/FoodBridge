import { PrismaService } from '../../common/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class RequestsService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    create(requesterId: string, dto: {
        donationId: string;
        note?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        donationId: string;
        requesterId: string;
        note: string | null;
    }>;
    myRequests(userId: string): Promise<({
        donation: {
            id: string;
            title: string;
            createdAt: Date;
            lat: number | null;
            lng: number | null;
            donorId: string;
            description: string | null;
            category: string | null;
            quantity: number;
            unit: string;
            cooked: boolean;
            expiryTime: Date | null;
            pickupAddress: string | null;
            status: string;
            reportedCount: number;
            availableFrom: Date | null;
            availableTo: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        status: string;
        donationId: string;
        requesterId: string;
        note: string | null;
    })[]>;
    accept(requestId: string, userId: string): Promise<{
        ok: boolean;
    }>;
    reject(requestId: string, userId: string): Promise<{
        ok: boolean;
    }>;
    cancel(requestId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        donationId: string;
        requesterId: string;
        note: string | null;
    }>;
}
