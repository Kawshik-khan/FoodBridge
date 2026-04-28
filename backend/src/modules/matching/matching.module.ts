import { Module } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { MatchingService } from './matching.service'

@Module({
  providers: [MatchingService, PrismaService],
  exports: [MatchingService]
})
export class MatchingModule {}
