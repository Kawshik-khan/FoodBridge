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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async overview() {
        const [totalDonations, completedPickups, activeUsers, mealsSaved] = await Promise.all([
            this.prisma.donation.count(),
            this.prisma.pickup.count({ where: { status: 'DELIVERED' } }),
            this.prisma.user.count({ where: { isBanned: false } }),
            this.prisma.donation.aggregate({ _sum: { quantity: true } })
        ]);
        return {
            totalDonations,
            completedPickups,
            activeUsers,
            mealsSaved: mealsSaved._sum.quantity || 0
        };
    }
    async donations() {
        const donations = await this.prisma.donation.findMany({ orderBy: { createdAt: 'asc' } });
        return donations.map(donation => ({ date: donation.createdAt, status: donation.status }));
    }
    async users() {
        const users = await this.prisma.user.findMany({ orderBy: { createdAt: 'asc' } });
        return users.map(user => ({ date: user.createdAt, role: user.role, verified: user.verified }));
    }
    async impact() {
        const donations = await this.prisma.donation.findMany({ include: { donor: true } });
        const topCities = Object.entries(donations.reduce((acc, donation) => {
            var _a;
            const city = ((_a = (donation.pickupAddress || 'Unknown').split(',').pop()) === null || _a === void 0 ? void 0 : _a.trim()) || 'Unknown';
            acc[city] = (acc[city] || 0) + 1;
            return acc;
        }, {}))
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
        return {
            mealsSaved: donations.reduce((sum, donation) => sum + donation.quantity, 0),
            topCities,
            growthChart: donations.map(donation => ({ date: donation.createdAt, value: donation.quantity }))
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map