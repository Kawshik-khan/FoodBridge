import { IsDateString, IsString } from 'class-validator'

export class SchedulePickupDto {
  @IsString()
  donationId!: string

  @IsString()
  receiverId!: string

  @IsDateString()
  pickupTime!: string
}
