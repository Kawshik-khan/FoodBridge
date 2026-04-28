import { IsIn, IsOptional, IsString } from 'class-validator'

export class CreateUploadUrlDto {
  @IsIn(['cloudinary', 's3'])
  provider!: 'cloudinary' | 's3'

  @IsString()
  fileName!: string

  @IsString()
  mimeType!: string

  @IsOptional()
  @IsString()
  folder?: string
}
