import { PrismaService } from '../../common/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class PickupsService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    schedule(userId: string, dto: {
        donationId: string;
        receiverId: string;
        pickupTime: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        donorId: string;
        status: string;
        donationId: string;
        pickupTime: Date;
        otpCode: string;
        receiverId: string;
    }>;
    updateStatus(pickupId: string, userId: string, status: 'SCHEDULED' | 'IN_TRANSIT' | 'ARRIVED' | 'DELIVERED'): Promise<{
        id: string;
        createdAt: Date;
        donorId: string;
        status: string;
        donationId: string;
        pickupTime: Date;
        otpCode: string;
        receiverId: string;
    }>;
    verifyOtp(pickupId: string, userId: string, otpCode: string): Promise<{
        verified: boolean;
    }>;
    myPickups(userId: string): Promise<({
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
        donorId: string;
        status: string;
        donationId: string;
        pickupTime: Date;
        otpCode: string;
        receiverId: string;
    })[]>;
}
