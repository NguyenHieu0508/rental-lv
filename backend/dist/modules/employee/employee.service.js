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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_log_service_1 = require("../audit-log/audit-log.service");
let EmployeeService = class EmployeeService {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.search) {
            where.OR = [
                { fullName: { contains: query.search, mode: 'insensitive' } },
                { phone: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } },
                { department: { contains: query.search, mode: 'insensitive' } },
                { position: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const [items, total] = await this.prisma.$transaction([
            this.prisma.employee.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    branch: true,
                    user: true
                }
            }),
            this.prisma.employee.count({ where })
        ]);
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    async findOne(id) {
        const e = await this.prisma.employee.findUnique({
            where: { id },
            include: {
                branch: true,
                user: true,
                authoredPosts: true
            }
        });
        if (!e)
            throw new common_1.NotFoundException('Employee not found');
        return e;
    }
    async create(dto, actorId) {
        if (dto.userId) {
            const exists = await this.prisma.employee.findUnique({ where: { userId: dto.userId } });
            if (exists)
                throw new common_1.BadRequestException('User already assigned to another employee');
        }
        const employee = await this.prisma.employee.create({
            data: Object.assign(Object.assign({}, dto), { hireDate: dto.hireDate ? new Date(dto.hireDate) : undefined })
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'CREATE', 'Employee', employee.id, employee);
        return employee;
    }
    async update(id, dto, actorId) {
        const before = await this.findOne(id);
        const updated = await this.prisma.employee.update({
            where: { id },
            data: Object.assign(Object.assign({}, dto), { hireDate: dto.hireDate ? new Date(dto.hireDate) : undefined })
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'UPDATE', 'Employee', id, {
            before,
            after: updated
        });
        return updated;
    }
    async delete(id, actorId) {
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'DELETE', 'Employee', id);
        return this.prisma.employee.delete({ where: { id } });
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_log_service_1.AuditLogService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map