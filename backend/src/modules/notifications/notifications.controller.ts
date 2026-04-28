import { Controller, Get, Patch, Param, Req } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private notifications: NotificationsService) {}

  @Get()
  async myNotifications(@Req() req: any) {
    return this.notifications.listForUser(req.user.userId)
  }

  @Patch(':id/read')
  async markRead(@Param('id') id: string, @Req() req: any) {
    return this.notifications.markRead(id, req.user.userId)
  }
}
