import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class CreateRatingDto {
  @IsString()
  toUserId!: string

  @IsInt()
  @Min(1)
  @Max(5)
  stars!: number

  @IsOptional()
  @IsString()
  comment?: string
}
