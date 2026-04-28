import { Module } from '@nestjs/common'
import { PickupsController } from './pickups.controller'
import { PickupsService } from './pickups.service'
import { PrismaService } from '../../common/prisma/prisma.service'
import { NotificationsModule } from '../notifications/notifications.module'

@Module({
  imports: [NotificationsModule],
  controllers: [PickupsController],
  providers: [PickupsService, PrismaService],
  exports: [PickupsService]
})
export class PickupsModule {}
