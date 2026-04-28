import { CanActivate, ExecutionContext } from '@nestjs/common';
import { BruteForceService } from '../services/brute-force.service';
export declare class RateLimitGuard implements CanActivate {
    private bruteForceService;
    constructor(bruteForceService: BruteForceService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
