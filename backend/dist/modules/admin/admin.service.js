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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async dashboard() {
        const [users, donations, requests, pickups, reports] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.donation.count(),
            this.prisma.request.count(),
            this.prisma.pickup.count(),
            this.prisma.report.count()
        ]);
        return { users, donations, requests, pickups, reports };
    }
    async listUsers() {
        return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async banUser(id, reason) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.prisma.user.update({ where: { id }, data: { isBanned: true, verified: false } });
    }
    async verifyUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.prisma.user.update({ where: { id }, data: { verified: true } });
    }
    async reportedDonations() {
        return this.prisma.donation.findMany({ where: { reportedCount: { gt: 0 } }, orderBy: { reportedCount: 'desc' }, include: { donor: true } });
    }
    async deleteDonation(id) {
        return this.prisma.donation.delete({ where: { id } });
    }
    async reports() {
        return this.prisma.report.findMany({ orderBy: { createdAt: 'desc' }, include: { reporter: true, donation: true } });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map