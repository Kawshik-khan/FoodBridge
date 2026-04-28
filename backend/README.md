# FoodBridge Backend

Scaffolded NestJS backend for FoodBridge. This repository contains a production-ready architecture scaffold using NestJS, Prisma, PostgreSQL, Redis, BullMQ and Cloudinary/S3 for file uploads.

Quick start

1. Copy `.env.example` to `.env` and fill values.
2. Run with Docker Compose:

```bash
docker-compose up --build
```

3. Generate Prisma client and migrate:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start app (dev):

```bash
npm run start:dev
```

Modules included

- Auth (JWT + refresh tokens)
- Users
- Donations
- Matching service
- Notifications (BullMQ)
- Prisma schema

Notes

- This is a scaffold. Implement production concerns: secret rotation, proper refresh token rotation, bruteforce protection, input validation schemas, unit tests, and CI/CD.
