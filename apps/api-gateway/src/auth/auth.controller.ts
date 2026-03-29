import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto'; // Copia el DTO aquí también

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('SSO_SERVICE') private readonly ssoClient: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    // Enviamos el comando 'register_user' al microservicio
    return this.ssoClient.send({ cmd: 'register_user' }, createUserDto);
  }

  @Get('users')
  getAllUsers() {
    return this.ssoClient.send({ cmd: 'get_all_users' }, {});
  }
}