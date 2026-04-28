import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
export declare class RequestsController {
    private requests;
    constructor(requests: RequestsService);
    create(userId: string, body: CreateRequestDto): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        donationId: string;
        requesterId: string;
        note: string | null;
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
        status: string;
        donationId: string;
        requesterId: string;
        note: string | null;
    })[]>;
    accept(id: string, userId: string): Promise<{
        ok: boolean;
    }>;
    reject(id: string, userId: string): Promise<{
        ok: boolean;
    }>;
    cancel(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        donationId: string;
        requesterId: string;
        note: string | null;
    }>;
}
