export declare class UploadsService {
    private s3;
    constructor();
    private readonly allowedMimeTypes;
    private readonly maxFileSize;
    createUploadTarget(provider: 'cloudinary' | 's3', fileName: string, mimeType: string, folder?: string, fileSize?: number): Promise<{
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
