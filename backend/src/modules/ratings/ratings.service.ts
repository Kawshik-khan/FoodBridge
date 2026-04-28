import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async create(fromUserId: string, dto: { toUserId: string; stars: number; comment?: string }) {
    if (fromUserId === dto.toUserId) throw new BadRequestException('Cannot rate yourself')

    const rating = await this.prisma.rating.create({
      data: {
        fromUserId,
        toUserId: dto.toUserId,
        stars: dto.stars,
        comment: dto.comment
      }
    })

    const ratings = await this.prisma.rating.findMany({ where: { toUserId: dto.toUserId } })
    const average = ratings.reduce((sum, item) => sum + item.stars, 0) / ratings.length
    await this.prisma.user.update({ where: { id: dto.toUserId }, data: { trustScore: average } })
    return rating
  }

  async getByUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundException('User not found')
    return this.prisma.rating.findMany({ where: { toUserId: userId }, orderBy: { createdAt: 'desc' } })
  }
}
