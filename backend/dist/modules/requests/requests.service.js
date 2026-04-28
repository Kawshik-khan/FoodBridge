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
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let RequestsService = class RequestsService {
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async create(requesterId, dto) {
        const donation = await this.prisma.donation.findUnique({ where: { id: dto.donationId }, include: { donor: true } });
        if (!donation)
            throw new common_1.NotFoundException('Donation not found');
        const request = await this.prisma.request.create({
            data: { donationId: dto.donationId, requesterId, note: dto.note }
        });
        await this.notifications.enqueueInApp(donation.donorId, 'New request received', `A receiver requested ${donation.title}`);
        return request;
    }
    async myRequests(userId) {
        return this.prisma.request.findMany({
            where: { requesterId: userId },
            orderBy: { createdAt: 'desc' },
            include: { donation: true }
        });
    }
    async accept(requestId, userId) {
        const request = await this.prisma.request.findUnique({
            where: { id: requestId },
            include: { donation: { include: { donor: true } } }
        });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        if (request.donation.donorId !== userId)
            throw new common_1.ForbiddenException('Only the donor can accept');
        await this.prisma.$transaction([
            this.prisma.request.update({ where: { id: requestId }, data: { status: 'ACCEPTED' } }),
            this.prisma.donation.update({ where: { id: request.donationId }, data: { status: 'RESERVED' } })
        ]);
        await this.notifications.enqueueInApp(request.requesterId, 'Request accepted', 'Your donation request has been accepted');
        return { ok: true };
    }
    async reject(requestId, userId) {
        const request = await this.prisma.request.findUnique({
            where: { id: requestId },
            include: { donation: true }
        });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        if (request.donation.donorId !== userId)
            throw new common_1.ForbiddenException('Only the donor can reject');
        await this.prisma.request.update({ where: { id: requestId }, data: { status: 'REJECTED' } });
        await this.notifications.enqueueInApp(request.requesterId, 'Request rejected', 'Your donation request was rejected');
        return { ok: true };
    }
    async cancel(requestId, userId) {
        const request = await this.prisma.request.findUnique({ where: { id: requestId } });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        if (request.requesterId !== userId)
            throw new common_1.ForbiddenException('Only the requester can cancel');
        return this.prisma.request.update({ where: { id: requestId }, data: { status: 'CANCELLED' } });
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, notifications_service_1.NotificationsService])
], RequestsService);
//# sourceMappingURL=requests.service.js.map