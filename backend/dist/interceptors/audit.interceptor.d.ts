import { AuditLogService } from '@/modules/audit-log/audit-log.service';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class AuditInterceptor implements NestInterceptor {
    private readonly audit;
    constructor(audit: AuditLogService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
