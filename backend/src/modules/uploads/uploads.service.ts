import { Injectable, BadRequestException } from '@nestjs/common'
import { randomBytes } from 'crypto'
import AWS from 'aws-sdk'
import { v2 as cloudinary } from 'cloudinary'

@Injectable()
export class UploadsService {
  private s3 = new AWS.S3({ region: process.env.AWS_REGION })

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
  }

  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
  ]

  private readonly maxFileSize = 10 * 1024 * 1024 // 10MB

  async createUploadTarget(provider: 'cloudinary' | 's3', fileName: string, mimeType: string, folder?: string, fileSize?: number) {
    // Validate file type
    if (!this.allowedMimeTypes.includes(mimeType)) {
      throw new BadRequestException(`File type ${mimeType} not allowed. Allowed types: ${this.allowedMimeTypes.join(', ')}`)
    }

    // Validate file size
    if (fileSize && fileSize > this.maxFileSize) {
      throw new BadRequestException(`File size ${fileSize} exceeds maximum allowed size of ${this.maxFileSize} bytes`)
    }

    if (provider === 's3') {
      const key = `${folder || 'uploads'}/${randomBytes(8).toString('hex')}-${fileName}`
      const url = await this.s3.getSignedUrlPromise('putObject', {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        ContentType: mimeType,
        Expires: 60 * 10
      })
      return { provider, uploadUrl: url, key }
    }

    if (provider === 'cloudinary') {
      const timestamp = Math.floor(Date.now() / 1000)
      const folderName = folder || 'foodbridge'
      const signature = cloudinary.utils.api_sign_request({
        folder: folderName,
        timestamp,
        allowed_formats: this.allowedMimeTypes.map(type => type.split('/')[1])
      }, process.env.CLOUDINARY_API_SECRET || '')
      return {
        provider,
        uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
        folder: folderName,
        signature,
        timestamp,
        apiKey: process.env.CLOUDINARY_API_KEY
      }
    }

    throw new BadRequestException('Unsupported provider')
  }
}
