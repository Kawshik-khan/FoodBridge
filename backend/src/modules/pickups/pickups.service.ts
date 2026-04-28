import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common'
import { randomInt } from 'crypto'
import { PrismaService } from '../../common/prisma/prisma.service'
import { NotificationsService } from '../notifications/notifications.service'

@Injectable()
export class PickupsService {
  constructor(private prisma: PrismaService, private notifications: NotificationsService) {}

  async schedule(userId: string, dto: { donationId: string; receiverId: string; pickupTime: string }) {
    const donation = await this.prisma.donation.findUnique({ where: { id: dto.donationId } })
    if (!donation) throw new NotFoundException('Donation not found')
    if (donation.donorId !== userId) throw new ForbiddenException('Only donor can schedule pickup')

    const otpCode = String(randomInt(100000, 999999))
    const pickup = await this.prisma.pickup.create({
      data: {
        donationId: dto.donationId,
        donorId: userId,
        receiverId: dto.receiverId,
        pickupTime: new Date(dto.pickupTime),
        otpCode,
        status: 'SCHEDULED'
      }
    })

    await this.prisma.donation.update({ where: { id: dto.donationId }, data: { status: 'PICKUP_SCHEDULED' } })
    await this.notifications.enqueueInApp(dto.receiverId, 'Pickup scheduled', `Pickup scheduled at ${dto.pickupTime}`)
    return pickup
  }

  async updateStatus(pickupId: string, userId: string, status: 'SCHEDULED' | 'IN_TRANSIT' | 'ARRIVED' | 'DELIVERED') {
    const pickup = await this.prisma.pickup.findUnique({ where: { id: pickupId } })
    if (!pickup) throw new NotFoundException('Pickup not found')
    if (pickup.donorId !== userId && pickup.receiverId !== userId) throw new ForbiddenException('Not allowed')
    return this.prisma.pickup.update({ where: { id: pickupId }, data: { status } })
  }

  async verifyOtp(pickupId: string, userId: string, otpCode: string) {
    const pickup = await this.prisma.pickup.findUnique({ where: { id: pickupId } })
    if (!pickup) throw new NotFoundException('Pickup not found')
    if (pickup.receiverId !== userId && pickup.donorId !== userId) throw new ForbiddenException('Not allowed')
    if (pickup.otpCode !== otpCode) throw new BadRequestException('Invalid OTP')

    await this.prisma.$transaction([
      this.prisma.pickup.update({ where: { id: pickupId }, data: { status: 'DELIVERED' } }),
      this.prisma.donation.update({ where: { id: pickup.donationId }, data: { status: 'COMPLETED' } })
    ])

    return { verified: true }
  }

  async myPickups(userId: string) {
    return this.prisma.pickup.findMany({
      where: { OR: [{ donorId: userId }, { receiverId: userId }] },
      orderBy: { createdAt: 'desc' },
      include: { donation: true }
    })
  }
}
