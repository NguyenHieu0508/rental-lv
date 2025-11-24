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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        const exists = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (exists)
            throw new common_1.ConflictException('Email already registered');
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashed,
                name: dto.name,
                role: 'USER'
            }
        });
        return this.generateToken(user.id, user.email, user.role);
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(dto.password, user.password);
        if (!ok)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return this.generateToken(user.id, user.email, user.role);
    }
    async logout(_userId) {
        return { message: 'Logged out successfully' };
    }
    async forgotPassword(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const expires = new Date(Date.now() + 10 * 60 * 1000);
        await this.prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                token,
                expiresAt: expires
            }
        });
        return { resetToken: token };
    }
    async resetPassword(dto) {
        const record = await this.prisma.passwordResetToken.findFirst({
            where: { token: dto.token }
        });
        if (!record)
            throw new common_1.UnauthorizedException('Invalid token');
        if (record.expiresAt < new Date())
            throw new common_1.UnauthorizedException('Token expired');
        const hashed = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: record.userId },
            data: { password: hashed }
        });
        await this.prisma.passwordResetToken.delete({
            where: { id: record.id }
        });
        return { message: 'Password reset successfully' };
    }
    async generateToken(id, email, role) {
        const payload = { sub: id, email, role };
        const token = await this.jwt.signAsync(payload, {
            secret: process.env.JWT_SECRET || 'super-secret-jwt-key',
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        });
        return {
            accessToken: token,
            user: { id, email, role }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map