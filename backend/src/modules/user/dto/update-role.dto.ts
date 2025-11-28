import { IsEnum } from 'class-validator';

export class UpdateRoleDto {
    @IsEnum(['ADMIN', 'STAFF', 'CUSTOMER'])
    role!: string;
}
