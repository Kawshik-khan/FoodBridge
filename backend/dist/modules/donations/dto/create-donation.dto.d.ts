export declare class CreateDonationDto {
    title: string;
    description?: string;
    category?: string;
    quantity: number;
    unit: string;
    cooked: boolean;
    expiryTime?: string;
    images?: string[];
    pickupAddress?: string;
    lat?: number;
    lng?: number;
    availableFrom?: string;
    availableTo?: string;
}
