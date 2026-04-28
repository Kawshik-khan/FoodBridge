import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { haversineDistanceKm } from '../../common/utils/geo'

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) {}

  async searchNearby({ lat, lng, maxKm = 50, limit = 50, minQuantity = 1 }: any) {
    const donations = await this.prisma.donation.findMany({ where: { status: 'AVAILABLE' }, include: { donor: true } })
    const scored = donations.map(d => {
      const distance = (d.lat && d.lng && lat && lng) ? haversineDistanceKm({ lat, lng }, { lat: d.lat, lng: d.lng }) : 9999
      const expiryScore = d.expiryTime ? Math.max(0, (new Date(d.expiryTime).getTime() - Date.now()) / (1000 * 60 * 60)) : 24
      const trust = d.donor?.trustScore ?? 0
      const quantityFit = d.quantity >= minQuantity ? 1 : d.quantity / minQuantity
      const score = (1 / (1 + distance)) * 0.5 + (1 / (1 + expiryScore)) * 0.3 + trust * 0.2 + quantityFit * 0.1
      return { donation: d, distance, score }
    })
    const filtered = scored.filter(s => s.distance <= maxKm).sort((a,b) => b.score - a.score)
    return filtered.slice(0, limit)
  }
}
