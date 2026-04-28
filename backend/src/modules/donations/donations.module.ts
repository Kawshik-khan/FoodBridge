import { Module } from '@nestjs/common'
import { DonationsService } from './donations.service'
import { DonationsController } from './donations.controller'
import { PrismaService } from '../../common/prisma/prisma.service'
import { MatchingModule } from '../matching/matching.module'
import { NotificationsModule } from '../notifications/notifications.module'

@Module({
  imports: [MatchingModule, NotificationsModule],
  providers: [DonationsService, PrismaService],
  controllers: [DonationsController],
  exports: [DonationsService]
})
export class DonationsModule {}
