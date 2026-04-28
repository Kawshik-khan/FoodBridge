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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = __importDefault(require("nodemailer"));
const twilio_1 = __importDefault(require("twilio"));
const prisma_service_1 = require("../../common/prisma/prisma.service");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            auth: process.env.SMTP_USER && process.env.SMTP_PASS ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
        });
        this.twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
            ? (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
            : null;
    }
    async enqueueEmail(to, subject, body, meta = {}) {
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            await this.enqueueInApp(meta.userId, subject, body, meta);
            return;
        }
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html: body
        });
    }
    async enqueueSMS(to, body, meta = {}) {
        if (!this.twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
            await this.enqueueInApp(meta.userId, 'SMS notification', body, meta);
            return;
        }
        await this.twilioClient.messages.create({
            to,
            from: process.env.TWILIO_PHONE_NUMBER,
            body
        });
    }
    async enqueueInApp(userId, title, body, data = {}) {
        if (!userId)
            return;
        await this.prisma.notification.create({
            data: {
                userId,
                title,
                body,
                data: Object.keys(data || {}).length ? JSON.stringify(data) : null,
                channel: 'IN_APP'
            }
        });
    }
    async listForUser(userId) {
        return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    }
    async markRead(notificationId, userId) {
        return this.prisma.notification.updateMany({ where: { id: notificationId, userId }, data: { read: true } });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map