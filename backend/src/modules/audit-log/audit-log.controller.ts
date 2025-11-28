import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { AuditLogQueryDto } from './dto/audit-log-query.dto';

@Controller('audit-logs')
export class AuditLogController {
    constructor(private readonly service: AuditLogService) { }

    @Get()
    getAll(@Query() query: AuditLogQueryDto) {
        return this.service.findAll(query);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }
}
