import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    me(req: any): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(dto: CreateUserDto): Promise<any>;
    update(id: string, dto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<any>;
}
