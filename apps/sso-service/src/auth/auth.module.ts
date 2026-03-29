import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service'; 
import { PrismaService } from '../prisma.service';    

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'WELLS_FARGO_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService, 
    UsersService,  
    PrismaService 
  ],
  controllers: [AuthController],
  exports: [UsersService], 
})
export class AuthModule {}