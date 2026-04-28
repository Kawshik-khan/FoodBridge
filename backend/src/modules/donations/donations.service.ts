import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { MatchingService } from '../matching/matching.service'

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService, private matching: MatchingService) {}

  async create(donorId: string, dto: any) {
    return this.prisma.donation.create({
      data: {
        donorId,
        title: dto.title,
        description: dto.description,
        category: dto.category,
        quantity: dto.quantity,
        unit: dto.unit,
        cooked: dto.cooked,
        expiryTime: dto.expiryTime ? new Date(dto.expiryTime) : undefined,
        pickupAddress: dto.pickupAddress,
        lat: dto.lat,
        lng: dto.lng,
        availableFrom: dto.availableFrom ? new Date(dto.availableFrom) : undefined,
        availableTo: dto.availableTo ? new Date(dto.availableTo) : undefined,
        images: dto.images?.length ? { create: dto.images.map((url: string) => ({ url })) } : undefined
      },
      include: { images: true }
    })
  }

  async findAll(query: any) {
    const limit = Number(query.limit || 20)
    const baseWhere: any = {
      status: 'AVAILABLE',
      ...(query.category ? { category: query.category } : {}),
      ...(query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: 'insensitive' } },
              { description: { contains: query.q, mode: 'insensitive' } },
              { pickupAddress: { contains: query.q, mode: 'insensitive' } }
            ]
          }
        : {})
    }

    if (query.lat && query.lng) {
      return this.matching.searchNearby({
        lat: Number(query.lat),
        lng: Number(query.lng),
        maxKm: query.distanceKm ? Number(query.distanceKm) : 50,
        limit,
        minQuantity: 1
      })
    }

    return this.prisma.donation.findMany({
      where: baseWhere,
      include: { donor: true, images: true },
      orderBy: [{ expiryTime: 'asc' }, { createdAt: 'desc' }],
      take: limit
    })
  }

  async findOne(id: string) {
    const donation = await this.prisma.donation.findUnique({ where: { id }, include: { donor: true, images: true, requests: true } })
    if (!donation) throw new NotFoundException('Donation not found')
    return donation
  }

  async update(id: string, data: any) {
    return this.prisma.donation.update({ where: { id }, data })
  }

  async remove(id: string) {
    return this.prisma.donation.delete({ where: { id } })
  }

  async myListings(donorId: string) {
    return this.prisma.donation.findMany({ where: { donorId }, orderBy: { createdAt: 'desc' }, include: { images: true } })
  }
}
