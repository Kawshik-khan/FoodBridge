import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async overview() {
    const [totalDonations, completedPickups, activeUsers, mealsSaved] = await Promise.all([
      this.prisma.donation.count(),
      this.prisma.pickup.count({ where: { status: 'DELIVERED' } }),
      this.prisma.user.count({ where: { isBanned: false } }),
      this.prisma.donation.aggregate({ _sum: { quantity: true } })
    ])

    return {
      totalDonations,
      completedPickups,
      activeUsers,
      mealsSaved: mealsSaved._sum.quantity || 0
    }
  }

  async donations() {
    const donations = await this.prisma.donation.findMany({ orderBy: { createdAt: 'asc' } })
    return donations.map(donation => ({ date: donation.createdAt, status: donation.status }))
  }

  async users() {
    const users = await this.prisma.user.findMany({ orderBy: { createdAt: 'asc' } })
    return users.map(user => ({ date: user.createdAt, role: user.role, verified: user.verified }))
  }

  async impact() {
    const donations = await this.prisma.donation.findMany({ include: { donor: true } })
    const topCities = Object.entries(
      donations.reduce<Record<string, number>>((acc, donation) => {
        const city = (donation.pickupAddress || 'Unknown').split(',').pop()?.trim() || 'Unknown'
        acc[city] = (acc[city] || 0) + 1
        return acc
      }, {})
    )
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      mealsSaved: donations.reduce((sum, donation) => sum + donation.quantity, 0),
      topCities,
      growthChart: donations.map(donation => ({ date: donation.createdAt, value: donation.quantity }))
    }
  }
}
