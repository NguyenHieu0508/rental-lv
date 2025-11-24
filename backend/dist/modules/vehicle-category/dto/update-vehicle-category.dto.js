"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vehicle_category_dto_1 = require("./create-vehicle-category.dto");
class UpdateVehicleCategoryDto extends (0, mapped_types_1.PartialType)(create_vehicle_category_dto_1.CreateVehicleCategoryDto) {
}
exports.UpdateVehicleCategoryDto = UpdateVehicleCategoryDto;
//# sourceMappingURL=update-vehicle-category.dto.js.map