import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
export declare class RatingsController {
    private ratings;
    constructor(ratings: RatingsService);
    create(userId: string, body: CreateRatingDto): Promise<{
        id: string;
        createdAt: Date;
        stars: number;
        comment: string | null;
        fromUserId: string;
        toUserId: string;
    }>;
    getByUser(id: string): Promise<{
        id: string;
        createdAt: Date;
        stars: number;
        comment: string | null;
        fromUserId: string;
        toUserId: string;
    }[]>;
}
