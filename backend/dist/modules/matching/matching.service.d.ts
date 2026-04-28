import { PrismaService } from '../../common/prisma/prisma.service';
export declare class MatchingService {
    private prisma;
    constructor(prisma: PrismaService);
    searchNearby({ lat, lng, maxKm, limit, minQuantity }: any): Promise<{
        donation: {
            donor: {
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
            };
        } & {
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
        distance: number;
        score: number;
    }[]>;
}
