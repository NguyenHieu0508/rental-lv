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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const audit_log_service_1 = require("../audit-log/audit-log.service");
const bcrypt = require("bcryptjs");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async findAll(query) {
        const page = query.page ? Number(query.page) : 1;
        const limit = query.limit ? Number(query.limit) : 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.role)
            where.role = query.role;
        if (query.isActive !== undefined)
            where.isActive = query.isActive === 'true';
        if (query.search) {
            where.OR = [
                { email: { contains: query.search, mode: 'insensitive' } },
                { name: { contains: query.search, mode: 'insensitive' } }
            ];
        }
        const [items, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.user.count({ where })
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
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async create(dto, actorId) {
        var _a, _b;
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.BadRequestException('Email already exists');
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashed,
                name: (_a = dto.name) !== null && _a !== void 0 ? _a : dto.email.split('@')[0],
                role: (_b = dto.role) !== null && _b !== void 0 ? _b : 'CUSTOMER'
            }
        });
        await this.audit.log(actorId || null, 'CREATE', 'User', user.id, user);
        return user;
    }
    async update(id, dto, actorId) {
        const before = await this.findOne(id);
        if (dto.email && dto.email !== before.email) {
            const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
            if (exists)
                throw new common_1.BadRequestException('Email already exists');
        }
        const data = Object.assign({}, dto);
        if (dto.password) {
            data.password = await bcrypt.hash(dto.password, 10);
        }
        const user = await this.prisma.user.update({
            where: { id },
            data
        });
        await this.audit.log(actorId || null, 'UPDATE', 'User', id, {
            before,
            after: user
        });
        return user;
    }
    async changePassword(id, body, actorId) {
        const user = await this.findOne(id);
        const match = await bcrypt.compare(body.oldPassword, user.password);
        if (!match)
            throw new common_1.BadRequestException('Old password incorrect');
        const hashed = await bcrypt.hash(body.newPassword, 10);
        await this.prisma.user.update({
            where: { id },
            data: { password: hashed }
        });
        await this.audit.log(actorId, 'CHANGE_PASSWORD', 'User', id);
        return { message: 'Password changed successfully' };
    }
    async resetPassword(id, body, actorId) {
        const hashed = await bcrypt.hash(body.newPassword, 10);
        await this.audit.log(actorId, 'RESET_PASSWORD', 'User', id, {
            newPassword: '**HIDDEN**'
        });
        return this.prisma.user.update({
            where: { id },
            data: { password: hashed }
        });
    }
    async updateRole(id, body, actorId) {
        const user = await this.findOne(id);
        if (id === actorId) {
            throw new common_1.ForbiddenException('Cannot change your own role');
        }
        const updated = await this.prisma.user.update({
            where: { id },
            data: { role: body.role }
        });
        await this.audit.log(actorId, 'UPDATE_ROLE', 'User', id, {
            from: user.role,
            to: body.role
        });
        return updated;
    }
    async updateLastLogin(id) {
        return this.prisma.user.update({
            where: { id },
            data: { lastLogin: new Date() }
        });
    }
    async softDelete(id, actorId) {
        await this.audit.log(actorId, 'SOFT_DELETE', 'User', id);
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false }
        });
    }
    async hardDelete(id, actorId) {
        await this.audit.log(actorId, 'HARD_DELETE', 'User', id);
        await this.prisma.customer.deleteMany({ where: { userId: id } });
        await this.prisma.employee.deleteMany({ where: { userId: id } });
        await this.prisma.passwordResetToken.deleteMany({ where: { userId: id } });
        await this.prisma.notification.deleteMany({ where: { userId: id } });
        return this.prisma.user.delete({ where: { id } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_log_service_1.AuditLogService])
], UserService);
//# sourceMappingURL=user.service.js.map