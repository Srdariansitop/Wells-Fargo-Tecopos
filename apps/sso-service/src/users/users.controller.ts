import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'register_user' })
  async register(@Payload() data: CreateUserDto) {
    return this.usersService.create(data, true);
  }
  @MessagePattern({ cmd: 'admin_create_user' })
async adminCreate(@Payload() data: CreateUserDto) {
  return this.usersService.create(data, false);
}

  @MessagePattern({ cmd: 'get_all_users' })
  async findAll() {
    return this.usersService.findAll();
  }
}