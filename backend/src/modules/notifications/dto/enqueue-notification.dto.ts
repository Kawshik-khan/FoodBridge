import { IsOptional, IsString } from 'class-validator'

export class EnqueueNotificationDto {
  @IsString()
  title!: string

  @IsString()
  body!: string

  @IsOptional()
  data?: Record<string, unknown>
}
