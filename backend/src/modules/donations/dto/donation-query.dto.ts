import { IsOptional, IsNumber, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class DonationQueryDto {
  @IsOptional()
  @IsString()
  q?: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lng?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  distanceKm?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cursor?: number
}
