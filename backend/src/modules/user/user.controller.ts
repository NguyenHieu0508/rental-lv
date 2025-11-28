import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryDto } from './dto/user-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Get()
  getAll(@Query() query: UserQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    // TODO: lấy actorId từ CurrentUser sau
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/change-password')
  changePassword(
    @Param('id') id: string,
    @Body() dto: ChangePasswordDto
  ) {
    // tạm dùng id làm actorId, sau gắn CurrentUser
    return this.service.changePassword(id, dto, id);
  }

  @Patch(':id/reset-password')
  resetPassword(
    @Param('id') id: string,
    @Body() dto: ResetPasswordDto
  ) {
    return this.service.resetPassword(id, dto, 'admin');
  }

  @Patch(':id/role')
  updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto
  ) {
    return this.service.updateRole(id, dto, 'admin');
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string) {
    return this.service.softDelete(id, 'system');
  }

  @Delete(':id')
  hardDelete(@Param('id') id: string) {
    return this.service.hardDelete(id, 'system');
  }
}
