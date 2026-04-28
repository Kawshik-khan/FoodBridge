import { IsArray, IsBoolean, IsDateString, IsOptional, IsNumber, IsString, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateDonationDto {
  @IsString()
  title!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  category?: string

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  quantity!: number

  @IsString()
  unit!: string

  @Type(() => Boolean)
  @IsBoolean()
  cooked!: boolean

  @IsOptional()
  @IsDateString()
  expiryTime?: string

  @IsOptional()
  @IsArray()
  images?: string[]

  @IsOptional()
  @IsString()
  pickupAddress?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lng?: number

  @IsOptional()
  @IsDateString()
  availableFrom?: string

  @IsOptional()
  @IsDateString()
  availableTo?: string
}
