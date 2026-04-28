import { UploadsService } from './uploads.service';
import { CreateUploadUrlDto } from './dto/create-upload-url.dto';
export declare class UploadsController {
    private uploads;
    constructor(uploads: UploadsService);
    signedUrl(body: CreateUploadUrlDto): Promise<{
        provider: "s3";
        uploadUrl: string;
        key: string;
        folder?: undefined;
        signature?: undefined;
        timestamp?: undefined;
        apiKey?: undefined;
    } | {
        provider: "cloudinary";
        uploadUrl: string;
        folder: string;
        signature: string;
        timestamp: number;
        apiKey: string;
        key?: undefined;
    }>;
}
