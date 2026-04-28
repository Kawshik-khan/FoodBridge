import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { DonationsModule } from './modules/donations/donations.module'
import { RequestsModule } from './modules/requests/requests.module'
import { PickupsModule } from './modules/pickups/pickups.module'
import { RatingsModule } from './modules/ratings/ratings.module'
import { AdminModule } from './modules/admin/admin.module'
import { AnalyticsModule } from './modules/analytics/analytics.module'
import { UploadsModule } from './modules/uploads/uploads.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { MatchingModule } from './modules/matching/matching.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NotificationsModule,
    MatchingModule,
    AuthModule,
    UsersModule,
    DonationsModule,
    RequestsModule,
    PickupsModule,
    RatingsModule,
    AdminModule,
    AnalyticsModule,
    UploadsModule
  ]
})
export class AppModule {}
