"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const donations_module_1 = require("./modules/donations/donations.module");
const requests_module_1 = require("./modules/requests/requests.module");
const pickups_module_1 = require("./modules/pickups/pickups.module");
const ratings_module_1 = require("./modules/ratings/ratings.module");
const admin_module_1 = require("./modules/admin/admin.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const matching_module_1 = require("./modules/matching/matching.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            notifications_module_1.NotificationsModule,
            matching_module_1.MatchingModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            donations_module_1.DonationsModule,
            requests_module_1.RequestsModule,
            pickups_module_1.PickupsModule,
            ratings_module_1.RatingsModule,
            admin_module_1.AdminModule,
            analytics_module_1.AnalyticsModule,
            uploads_module_1.UploadsModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map