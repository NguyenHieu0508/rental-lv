export declare class AuditLogResponseDto {
    id: string;
    userId?: string;
    module: string;
    action: string;
    entityId?: string;
    entityType?: string;
    metadata?: any;
    createdAt: Date;
}
