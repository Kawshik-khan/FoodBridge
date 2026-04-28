import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private notifications;
    constructor(notifications: NotificationsService);
    myNotifications(req: any): Promise<{
        data: string | null;
        id: string;
        title: string;
        body: string;
        read: boolean;
        channel: string;
        createdAt: Date;
        userId: string;
    }[]>;
    markRead(id: string, req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
