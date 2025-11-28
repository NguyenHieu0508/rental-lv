import { AuditLogService } from '@/modules/audit-log/audit-log.service';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(private readonly audit: AuditLogService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();

        // lấy user từ req.user (JWT)
        const user = req.user;
        const method = req.method;
        const url = req.url;

        const body = req.body;
        const params = req.params;
        const query = req.query;

        const ip = req.ip;
        const agent = req.headers['user-agent'];

        // module được lấy từ URL: /api/users → "users"
        const module = url.split('/')[2] || 'unknown';

        return next.handle().pipe(
            tap(async () => {
                if (!user) return;

                // KHÔNG LOG ADMIN
                if (user.role === 'ADMIN') return;

                // Optional: Không log login
                if (url.includes('/auth/login')) return;

                await this.audit.log(
                    user.id,
                    method,
                    module,
                    null,
                    {
                        url,
                        params,
                        query,
                        body,
                        ip,
                        agent
                    }
                );
            })
        );
    }
}
