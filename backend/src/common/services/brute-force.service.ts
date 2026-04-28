import { Injectable } from '@nestjs/common'

@Injectable()
export class BruteForceService {
  private readonly maxAttempts = 5
  private readonly lockSeconds = 15 * 60
  private readonly attempts = new Map<string, { count: number; expiresAt: number }>()

  async registerFailure(key: string) {
    const cacheKey = `bf:${key}`
    const now = Date.now()
    const current = this.attempts.get(cacheKey)

    if (!current || current.expiresAt <= now) {
      this.attempts.set(cacheKey, { count: 1, expiresAt: now + this.lockSeconds * 1000 })
      return 1
    }

    const nextCount = current.count + 1
    this.attempts.set(cacheKey, { count: nextCount, expiresAt: current.expiresAt })
    return nextCount
  }

  async clear(key: string) {
    this.attempts.delete(`bf:${key}`)
  }

  async isBlocked(key: string): Promise<Date | null> {
    const entry = this.attempts.get(`bf:${key}`)
    if (!entry) return null

    const now = Date.now()
    if (entry.expiresAt <= now) {
      this.attempts.delete(`bf:${key}`)
      return null
    }

    if (entry.count < this.maxAttempts) return null
    return new Date(entry.expiresAt)
  }
}
