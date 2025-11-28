"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceListModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_log_service_1 = require("../audit-log/audit-log.service");
const price_list_service_1 = require("./price-list.service");
const price_list_controller_1 = require("./price-list.controller");
let PriceListModule = class PriceListModule {
};
exports.PriceListModule = PriceListModule;
exports.PriceListModule = PriceListModule = __decorate([
    (0, common_1.Module)({
        controllers: [price_list_controller_1.PriceListController],
        providers: [price_list_service_1.PriceListService, prisma_service_1.PrismaService, audit_log_service_1.AuditLogService],
        exports: [price_list_service_1.PriceListService]
    })
], PriceListModule);
//# sourceMappingURL=price-list.module.js.map