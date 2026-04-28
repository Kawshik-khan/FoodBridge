export declare class CreateUploadUrlDto {
    provider: 'cloudinary' | 's3';
    fileName: string;
    mimeType: string;
    folder?: string;
}
