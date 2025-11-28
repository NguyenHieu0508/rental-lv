"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const audit_interceptor_1 = require("./interceptors/audit.interceptor");
const audit_log_service_1 = require("./modules/audit-log/audit-log.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    app.setGlobalPrefix('api');
    const auditService = app.get(audit_log_service_1.AuditLogService);
    app.useGlobalInterceptors(new audit_interceptor_1.AuditInterceptor(auditService));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Rental API')
        .setDescription('Car Rental Backend API (NestJS 11 + Prisma + MongoDB)')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT || 3001);
    console.log('Server: http://localhost:3001');
    console.log('Swagger: http://localhost:3001/docs');
}
bootstrap();
//# sourceMappingURL=main.js.map