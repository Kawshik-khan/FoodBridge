import { PickupsService } from './pickups.service';
import { SchedulePickupDto } from './dto/schedule-pickup.dto';
export declare class PickupsController {
    private pickups;
    constructor(pickups: PickupsService);
    schedule(userId: string, body: SchedulePickupDto): Promise<{
        id: string;
        createdAt: Date;
        donorId: string;
        status: string;
        donationId: string;
        pickupTime: Date;
        otpCode: string;
        receiverId: string;
    }>;
    status(id: string, userId: string, body: {
        status: 'SCHEDULED' | 'IN_TRANSIT' | 'ARRIVED' | 'DELIVERED';
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
    verifyOtp(id: string, userId: string, body: {
        otpCode: string;
    }): Promise<{
        verified: boolean;
    }>;
    my(userId: string): Promise<({
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
