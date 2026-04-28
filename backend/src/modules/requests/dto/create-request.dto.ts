import { IsOptional, IsString } from 'class-validator'

export class CreateRequestDto {
  @IsString()
  donationId!: string

  @IsOptional()
  @IsString()
  note?: string
}
