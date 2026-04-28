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
exports.PickupsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let PickupsService = class PickupsService {
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async schedule(userId, dto) {
        const donation = await this.prisma.donation.findUnique({ where: { id: dto.donationId } });
        if (!donation)
            throw new common_1.NotFoundException('Donation not found');
        if (donation.donorId !== userId)
            throw new common_1.ForbiddenException('Only donor can schedule pickup');
        const otpCode = String((0, crypto_1.randomInt)(100000, 999999));
        const pickup = await this.prisma.pickup.create({
            data: {
                donationId: dto.donationId,
                donorId: userId,
                receiverId: dto.receiverId,
                pickupTime: new Date(dto.pickupTime),
                otpCode,
                status: 'SCHEDULED'
            }
        });
        await this.prisma.donation.update({ where: { id: dto.donationId }, data: { status: 'PICKUP_SCHEDULED' } });
        await this.notifications.enqueueInApp(dto.receiverId, 'Pickup scheduled', `Pickup scheduled at ${dto.pickupTime}`);
        return pickup;
    }
    async updateStatus(pickupId, userId, status) {
        const pickup = await this.prisma.pickup.findUnique({ where: { id: pickupId } });
        if (!pickup)
            throw new common_1.NotFoundException('Pickup not found');
        if (pickup.donorId !== userId && pickup.receiverId !== userId)
            throw new common_1.ForbiddenException('Not allowed');
        return this.prisma.pickup.update({ where: { id: pickupId }, data: { status } });
    }
    async verifyOtp(pickupId, userId, otpCode) {
        const pickup = await this.prisma.pickup.findUnique({ where: { id: pickupId } });
        if (!pickup)
            throw new common_1.NotFoundException('Pickup not found');
        if (pickup.receiverId !== userId && pickup.donorId !== userId)
            throw new common_1.ForbiddenException('Not allowed');
        if (pickup.otpCode !== otpCode)
            throw new common_1.BadRequestException('Invalid OTP');
        await this.prisma.$transaction([
            this.prisma.pickup.update({ where: { id: pickupId }, data: { status: 'DELIVERED' } }),
            this.prisma.donation.update({ where: { id: pickup.donationId }, data: { status: 'COMPLETED' } })
        ]);
        return { verified: true };
    }
    async myPickups(userId) {
        return this.prisma.pickup.findMany({
            where: { OR: [{ donorId: userId }, { receiverId: userId }] },
            orderBy: { createdAt: 'desc' },
            include: { donation: true }
        });
    }
};
exports.PickupsService = PickupsService;
exports.PickupsService = PickupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, notifications_service_1.NotificationsService])
], PickupsService);
//# sourceMappingURL=pickups.service.js.map