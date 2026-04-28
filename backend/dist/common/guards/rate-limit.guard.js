"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const brute_force_service_1 = require("../services/brute-force.service");
let RateLimitGuard = class RateLimitGuard {
    constructor(bruteForceService) {
        this.bruteForceService = bruteForceService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const key = request.ip || request.headers['x-forwarded-for'] || 'unknown';
        const blockedUntil = await this.bruteForceService.isBlocked(String(key));
        if (blockedUntil) {
            throw new common_1.HttpException(`Too many attempts. Try again after ${blockedUntil.toISOString()}`, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        return true;
    }
};
exports.RateLimitGuard = RateLimitGuard;
exports.RateLimitGuard = RateLimitGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [brute_force_service_1.BruteForceService])
], RateLimitGuard);
//# sourceMappingURL=rate-limit.guard.js.map