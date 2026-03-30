import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'WELLS_FARGO_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: 'SSO_SERVICE', // Nombre interno para inyectar
        transport: Transport.TCP,
        options: {
          host: process.env.SSO_HOST || '127.0.0.1',
          port: Number(process.env.SSO_PORT || 3001),
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}