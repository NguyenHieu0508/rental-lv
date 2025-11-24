"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePriceListDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pricelist_dto_1 = require("./create-pricelist.dto");
class UpdatePriceListDto extends (0, mapped_types_1.PartialType)(create_pricelist_dto_1.CreatePriceListDto) {
}
exports.UpdatePriceListDto = UpdatePriceListDto;
//# sourceMappingURL=update-pricelist.dto.js.map