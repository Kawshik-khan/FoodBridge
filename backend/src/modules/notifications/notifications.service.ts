import { Injectable } from '@nestjs/common'
import nodemailer from 'nodemailer'
import twilio from 'twilio'
import { PrismaService } from '../../common/prisma/prisma.service'

@Injectable()
export class NotificationsService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: process.env.SMTP_USER && process.env.SMTP_PASS ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  })

  private twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null

  constructor(private prisma: PrismaService) {
  }

  async enqueueEmail(to: string, subject: string, body: string, meta: any = {}) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      await this.enqueueInApp(meta.userId, subject, body, meta)
      return
    }

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: body
    })
  }

  async enqueueSMS(to: string, body: string, meta: any = {}) {
    if (!this.twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
      await this.enqueueInApp(meta.userId, 'SMS notification', body, meta)
      return
    }

    await this.twilioClient.messages.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body
    })
  }

  async enqueueInApp(userId: string, title: string, body: string, data: any = {}) {
    if (!userId) return

    await this.prisma.notification.create({
      data: {
        userId,
        title,
        body,
        data: Object.keys(data || {}).length ? JSON.stringify(data) : null,
        channel: 'IN_APP'
      }
    })
  }

  async listForUser(userId: string) {
    return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  }

  async markRead(notificationId: string, userId: string) {
    return this.prisma.notification.updateMany({ where: { id: notificationId, userId }, data: { read: true } })
  }
}
