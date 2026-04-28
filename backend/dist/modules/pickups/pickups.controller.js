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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickupsController = void 0;
const common_1 = require("@nestjs/common");
const pickups_service_1 = require("./pickups.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const schedule_pickup_dto_1 = require("./dto/schedule-pickup.dto");
let PickupsController = class PickupsController {
    constructor(pickups) {
        this.pickups = pickups;
    }
    schedule(userId, body) {
        return this.pickups.schedule(userId, body);
    }
    status(id, userId, body) {
        return this.pickups.updateStatus(id, userId, body.status);
    }
    verifyOtp(id, userId, body) {
        return this.pickups.verifyOtp(id, userId, body.otpCode);
    }
    my(userId) {
        return this.pickups.myPickups(userId);
    }
};
exports.PickupsController = PickupsController;
__decorate([
    (0, common_1.Post)('schedule'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, schedule_pickup_dto_1.SchedulePickupDto]),
    __metadata("design:returntype", void 0)
], PickupsController.prototype, "schedule", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PickupsController.prototype, "status", null);
__decorate([
    (0, common_1.Post)(':id/verify-otp'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PickupsController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PickupsController.prototype, "my", null);
exports.PickupsController = PickupsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('pickups'),
    __metadata("design:paramtypes", [pickups_service_1.PickupsService])
], PickupsController);
//# sourceMappingURL=pickups.controller.js.map