"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BruteForceService = void 0;
const common_1 = require("@nestjs/common");
let BruteForceService = class BruteForceService {
    constructor() {
        this.maxAttempts = 5;
        this.lockSeconds = 15 * 60;
        this.attempts = new Map();
    }
    async registerFailure(key) {
        const cacheKey = `bf:${key}`;
        const now = Date.now();
        const current = this.attempts.get(cacheKey);
        if (!current || current.expiresAt <= now) {
            this.attempts.set(cacheKey, { count: 1, expiresAt: now + this.lockSeconds * 1000 });
            return 1;
        }
        const nextCount = current.count + 1;
        this.attempts.set(cacheKey, { count: nextCount, expiresAt: current.expiresAt });
        return nextCount;
    }
    async clear(key) {
        this.attempts.delete(`bf:${key}`);
    }
    async isBlocked(key) {
        const entry = this.attempts.get(`bf:${key}`);
        if (!entry)
            return null;
        const now = Date.now();
        if (entry.expiresAt <= now) {
            this.attempts.delete(`bf:${key}`);
            return null;
        }
        if (entry.count < this.maxAttempts)
            return null;
        return new Date(entry.expiresAt);
    }
};
exports.BruteForceService = BruteForceService;
exports.BruteForceService = BruteForceService = __decorate([
    (0, common_1.Injectable)()
], BruteForceService);
//# sourceMappingURL=brute-force.service.js.map