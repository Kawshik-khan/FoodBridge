import { PrismaService } from '../../common/prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    private transporter;
    private twilioClient;
    constructor(prisma: PrismaService);
    enqueueEmail(to: string, subject: string, body: string, meta?: any): Promise<void>;
    enqueueSMS(to: string, body: string, meta?: any): Promise<void>;
    enqueueInApp(userId: string, title: string, body: string, data?: any): Promise<void>;
    listForUser(userId: string): Promise<{
        data: string | null;
        id: string;
        title: string;
        body: string;
        read: boolean;
        channel: string;
        createdAt: Date;
        userId: string;
    }[]>;
    markRead(notificationId: string, userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
