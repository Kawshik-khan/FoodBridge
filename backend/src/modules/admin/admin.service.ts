import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const [users, donations, requests, pickups, reports] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.donation.count(),
      this.prisma.request.count(),
      this.prisma.pickup.count(),
      this.prisma.report.count()
    ])
    return { users, donations, requests, pickups, reports }
  }

  async listUsers() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  }

  async banUser(id: string, reason?: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found')
    return this.prisma.user.update({ where: { id }, data: { isBanned: true, verified: false } })
  }

  async verifyUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found')
    return this.prisma.user.update({ where: { id }, data: { verified: true } })
  }

  async reportedDonations() {
    return this.prisma.donation.findMany({ where: { reportedCount: { gt: 0 } }, orderBy: { reportedCount: 'desc' }, include: { donor: true } })
  }

  async deleteDonation(id: string) {
    return this.prisma.donation.delete({ where: { id } })
  }

  async reports() {
    return this.prisma.report.findMany({ orderBy: { createdAt: 'desc' }, include: { reporter: true, donation: true } })
  }
}
