import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { BruteForceService } from '../services/brute-force.service'

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private bruteForceService: BruteForceService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const key = request.ip || request.headers['x-forwarded-for'] || 'unknown'
    const blockedUntil = await this.bruteForceService.isBlocked(String(key))
    if (blockedUntil) {
      throw new HttpException(
        `Too many attempts. Try again after ${blockedUntil.toISOString()}`,
        HttpStatus.TOO_MANY_REQUESTS
      )
    }
    return true
  }
}
