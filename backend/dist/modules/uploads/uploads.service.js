"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const cloudinary_1 = require("cloudinary");
let UploadsService = class UploadsService {
    constructor() {
        this.s3 = new aws_sdk_1.default.S3({ region: process.env.AWS_REGION });
        this.allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf'
        ];
        this.maxFileSize = 10 * 1024 * 1024;
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }
    async createUploadTarget(provider, fileName, mimeType, folder, fileSize) {
        if (!this.allowedMimeTypes.includes(mimeType)) {
            throw new common_1.BadRequestException(`File type ${mimeType} not allowed. Allowed types: ${this.allowedMimeTypes.join(', ')}`);
        }
        if (fileSize && fileSize > this.maxFileSize) {
            throw new common_1.BadRequestException(`File size ${fileSize} exceeds maximum allowed size of ${this.maxFileSize} bytes`);
        }
        if (provider === 's3') {
            const key = `${folder || 'uploads'}/${(0, crypto_1.randomBytes)(8).toString('hex')}-${fileName}`;
            const url = await this.s3.getSignedUrlPromise('putObject', {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
                ContentType: mimeType,
                Expires: 60 * 10
            });
            return { provider, uploadUrl: url, key };
        }
        if (provider === 'cloudinary') {
            const timestamp = Math.floor(Date.now() / 1000);
            const folderName = folder || 'foodbridge';
            const signature = cloudinary_1.v2.utils.api_sign_request({
                folder: folderName,
                timestamp,
                allowed_formats: this.allowedMimeTypes.map(type => type.split('/')[1])
            }, process.env.CLOUDINARY_API_SECRET || '');
            return {
                provider,
                uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
                folder: folderName,
                signature,
                timestamp,
                apiKey: process.env.CLOUDINARY_API_KEY
            };
        }
        throw new common_1.BadRequestException('Unsupported provider');
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map