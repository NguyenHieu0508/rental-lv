"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUpdate = sanitizeUpdate;
function sanitizeUpdate(dto) {
    const data = Object.assign({}, dto);
    delete data.id;
    delete data._id;
    delete data.createdAt;
    delete data.updatedAt;
    return data;
}
//# sourceMappingURL=sanitize-update.js.map