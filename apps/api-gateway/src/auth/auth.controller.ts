import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto'; 
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('SSO_SERVICE') private readonly ssoClient: ClientProxy,
  ) {}

@Post('login')
login(@Body() loginDto: LoginDto) { 
  return this.ssoClient.send({ cmd: 'login_user' }, loginDto);
}
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.ssoClient.send({ cmd: 'register_user' }, createUserDto);
  }
   @UseGuards(AuthGuard, RolesGuard)
 @Roles('ADMIN')
  @Post('admin/create-user')
adminCreate(@Body() createUserDto: CreateUserDto) {
  return this.ssoClient.send({ cmd: 'admin_create_user' }, createUserDto);
}

 @UseGuards(AuthGuard, RolesGuard)
 @Roles('ADMIN')
  @Get('users')
  getAllUsers() {
    return this.ssoClient.send({ cmd: 'get_all_users' }, {});
  }
}