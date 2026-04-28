import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { NotificationsService } from '../notifications/notifications.service'

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService, private notifications: NotificationsService) {}

  async create(requesterId: string, dto: { donationId: string; note?: string }) {
    const donation = await this.prisma.donation.findUnique({ where: { id: dto.donationId }, include: { donor: true } })
    if (!donation) throw new NotFoundException('Donation not found')

    const request = await this.prisma.request.create({
      data: { donationId: dto.donationId, requesterId, note: dto.note }
    })

    await this.notifications.enqueueInApp(donation.donorId, 'New request received', `A receiver requested ${donation.title}`)
    return request
  }

  async myRequests(userId: string) {
    return this.prisma.request.findMany({
      where: { requesterId: userId },
      orderBy: { createdAt: 'desc' },
      include: { donation: true }
    })
  }

  async accept(requestId: string, userId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
      include: { donation: { include: { donor: true } } }
    })
    if (!request) throw new NotFoundException('Request not found')
    if (request.donation.donorId !== userId) throw new ForbiddenException('Only the donor can accept')

    await this.prisma.$transaction([
      this.prisma.request.update({ where: { id: requestId }, data: { status: 'ACCEPTED' } }),
      this.prisma.donation.update({ where: { id: request.donationId }, data: { status: 'RESERVED' } })
    ])

    await this.notifications.enqueueInApp(request.requesterId, 'Request accepted', 'Your donation request has been accepted')
    return { ok: true }
  }

  async reject(requestId: string, userId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
      include: { donation: true }
    })
    if (!request) throw new NotFoundException('Request not found')
    if (request.donation.donorId !== userId) throw new ForbiddenException('Only the donor can reject')

    await this.prisma.request.update({ where: { id: requestId }, data: { status: 'REJECTED' } })
    await this.notifications.enqueueInApp(request.requesterId, 'Request rejected', 'Your donation request was rejected')
    return { ok: true }
  }

  async cancel(requestId: string, userId: string) {
    const request = await this.prisma.request.findUnique({ where: { id: requestId } })
    if (!request) throw new NotFoundException('Request not found')
    if (request.requesterId !== userId) throw new ForbiddenException('Only the requester can cancel')
    return this.prisma.request.update({ where: { id: requestId }, data: { status: 'CANCELLED' } })
  }
}
