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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditInterceptor = void 0;
const audit_log_service_1 = require("../modules/audit-log/audit-log.service");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let AuditInterceptor = class AuditInterceptor {
    constructor(audit) {
        this.audit = audit;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const method = req.method;
        const url = req.url;
        const body = req.body;
        const params = req.params;
        const query = req.query;
        const ip = req.ip;
        const agent = req.headers['user-agent'];
        const module = url.split('/')[2] || 'unknown';
        return next.handle().pipe((0, operators_1.tap)(async () => {
            if (!user)
                return;
            if (user.role === 'ADMIN')
                return;
            if (url.includes('/auth/login'))
                return;
            await this.audit.log(user.id, method, module, null, {
                url,
                params,
                query,
                body,
                ip,
                agent
            });
        }));
    }
};
exports.AuditInterceptor = AuditInterceptor;
exports.AuditInterceptor = AuditInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [audit_log_service_1.AuditLogService])
], AuditInterceptor);
//# sourceMappingURL=audit.interceptor.js.map