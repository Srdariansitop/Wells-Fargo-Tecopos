import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@MessagePattern({ cmd: 'login_user' })
async login(@Payload() data: LoginDto) { 
  return this.authService.login(data.email, data.password);
}
}