import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationQueryDto } from './dto/donation-query.dto';
export declare class DonationsController {
    private donations;
    constructor(donations: DonationsService);
    create(donorId: string, body: CreateDonationDto): Promise<{
        images: {
            id: string;
            url: string;
            donationId: string;
        }[];
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
    }>;
    findAll(query: DonationQueryDto): Promise<{
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
    }[] | ({
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
        images: {
            id: string;
            url: string;
            donationId: string;
        }[];
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
    })[]>;
    myListings(donorId: string): Promise<({
        images: {
            id: string;
            url: string;
            donationId: string;
        }[];
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
    })[]>;
    findOne(id: string): Promise<{
        requests: {
            id: string;
            createdAt: Date;
            status: string;
            donationId: string;
            requesterId: string;
            note: string | null;
        }[];
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
        images: {
            id: string;
            url: string;
            donationId: string;
        }[];
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
    }>;
    update(id: string, body: UpdateDonationDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
