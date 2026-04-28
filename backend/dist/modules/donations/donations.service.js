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
exports.DonationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const matching_service_1 = require("../matching/matching.service");
let DonationsService = class DonationsService {
    constructor(prisma, matching) {
        this.prisma = prisma;
        this.matching = matching;
    }
    async create(donorId, dto) {
        var _a;
        return this.prisma.donation.create({
            data: {
                donorId,
                title: dto.title,
                description: dto.description,
                category: dto.category,
                quantity: dto.quantity,
                unit: dto.unit,
                cooked: dto.cooked,
                expiryTime: dto.expiryTime ? new Date(dto.expiryTime) : undefined,
                pickupAddress: dto.pickupAddress,
                lat: dto.lat,
                lng: dto.lng,
                availableFrom: dto.availableFrom ? new Date(dto.availableFrom) : undefined,
                availableTo: dto.availableTo ? new Date(dto.availableTo) : undefined,
                images: ((_a = dto.images) === null || _a === void 0 ? void 0 : _a.length) ? { create: dto.images.map((url) => ({ url })) } : undefined
            },
            include: { images: true }
        });
    }
    async findAll(query) {
        const limit = Number(query.limit || 20);
        const baseWhere = {
            status: 'AVAILABLE',
            ...(query.category ? { category: query.category } : {}),
            ...(query.q
                ? {
                    OR: [
                        { title: { contains: query.q, mode: 'insensitive' } },
                        { description: { contains: query.q, mode: 'insensitive' } },
                        { pickupAddress: { contains: query.q, mode: 'insensitive' } }
                    ]
                }
                : {})
        };
        if (query.lat && query.lng) {
            return this.matching.searchNearby({
                lat: Number(query.lat),
                lng: Number(query.lng),
                maxKm: query.distanceKm ? Number(query.distanceKm) : 50,
                limit,
                minQuantity: 1
            });
        }
        return this.prisma.donation.findMany({
            where: baseWhere,
            include: { donor: true, images: true },
            orderBy: [{ expiryTime: 'asc' }, { createdAt: 'desc' }],
            take: limit
        });
    }
    async findOne(id) {
        const donation = await this.prisma.donation.findUnique({ where: { id }, include: { donor: true, images: true, requests: true } });
        if (!donation)
            throw new common_1.NotFoundException('Donation not found');
        return donation;
    }
    async update(id, data) {
        return this.prisma.donation.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.donation.delete({ where: { id } });
    }
    async myListings(donorId) {
        return this.prisma.donation.findMany({ where: { donorId }, orderBy: { createdAt: 'desc' }, include: { images: true } });
    }
};
exports.DonationsService = DonationsService;
exports.DonationsService = DonationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, matching_service_1.MatchingService])
], DonationsService);
//# sourceMappingURL=donations.service.js.map