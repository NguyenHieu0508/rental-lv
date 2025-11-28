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
exports.VehicleCategoryController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_category_service_1 = require("./vehicle-category.service");
const vehicle_category_query_dto_1 = require("./dto/vehicle-category-query.dto");
const create_vehicle_category_dto_1 = require("./dto/create-vehicle-category.dto");
const update_vehicle_category_dto_1 = require("./dto/update-vehicle-category.dto");
let VehicleCategoryController = class VehicleCategoryController {
    constructor(service) {
        this.service = service;
    }
    list(query) {
        return this.service.findAll(query);
    }
    detail(id) {
        return this.service.findOne(id);
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
exports.VehicleCategoryController = VehicleCategoryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_category_query_dto_1.VehicleCategoryQueryDto]),
    __metadata("design:returntype", void 0)
], VehicleCategoryController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleCategoryController.prototype, "detail", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_category_dto_1.CreateVehicleCategoryDto]),
    __metadata("design:returntype", void 0)
], VehicleCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_category_dto_1.UpdateVehicleCategoryDto]),
    __metadata("design:returntype", void 0)
], VehicleCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleCategoryController.prototype, "delete", null);
exports.VehicleCategoryController = VehicleCategoryController = __decorate([
    (0, common_1.Controller)('vehicle-categories'),
    __metadata("design:paramtypes", [vehicle_category_service_1.VehicleCategoryService])
], VehicleCategoryController);
//# sourceMappingURL=vehicle-category.controller.js.map