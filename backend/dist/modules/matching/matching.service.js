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
exports.MatchingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const geo_1 = require("../../common/utils/geo");
let MatchingService = class MatchingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchNearby({ lat, lng, maxKm = 50, limit = 50, minQuantity = 1 }) {
        const donations = await this.prisma.donation.findMany({ where: { status: 'AVAILABLE' }, include: { donor: true } });
        const scored = donations.map(d => {
            var _a, _b;
            const distance = (d.lat && d.lng && lat && lng) ? (0, geo_1.haversineDistanceKm)({ lat, lng }, { lat: d.lat, lng: d.lng }) : 9999;
            const expiryScore = d.expiryTime ? Math.max(0, (new Date(d.expiryTime).getTime() - Date.now()) / (1000 * 60 * 60)) : 24;
            const trust = (_b = (_a = d.donor) === null || _a === void 0 ? void 0 : _a.trustScore) !== null && _b !== void 0 ? _b : 0;
            const quantityFit = d.quantity >= minQuantity ? 1 : d.quantity / minQuantity;
            const score = (1 / (1 + distance)) * 0.5 + (1 / (1 + expiryScore)) * 0.3 + trust * 0.2 + quantityFit * 0.1;
            return { donation: d, distance, score };
        });
        const filtered = scored.filter(s => s.distance <= maxKm).sort((a, b) => b.score - a.score);
        return filtered.slice(0, limit);
    }
};
exports.MatchingService = MatchingService;
exports.MatchingService = MatchingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MatchingService);
//# sourceMappingURL=matching.service.js.map