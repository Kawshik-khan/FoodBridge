import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { PickupsService } from './pickups.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { SchedulePickupDto } from './dto/schedule-pickup.dto'

@UseGuards(JwtAuthGuard)
@Controller('pickups')
export class PickupsController {
  constructor(private pickups: PickupsService) {}

  @Post('schedule')
  schedule(@CurrentUser('userId') userId: string, @Body() body: SchedulePickupDto) {
    return this.pickups.schedule(userId, body)
  }

  @Patch(':id/status')
  status(@Param('id') id: string, @CurrentUser('userId') userId: string, @Body() body: { status: 'SCHEDULED' | 'IN_TRANSIT' | 'ARRIVED' | 'DELIVERED' }) {
    return this.pickups.updateStatus(id, userId, body.status)
  }

  @Post(':id/verify-otp')
  verifyOtp(@Param('id') id: string, @CurrentUser('userId') userId: string, @Body() body: { otpCode: string }) {
    return this.pickups.verifyOtp(id, userId, body.otpCode)
  }

  @Get('my')
  my(@CurrentUser('userId') userId: string) {
    return this.pickups.myPickups(userId)
  }
}
