import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [
    // 1. Configuración simplificada (Sintaxis para v5+)
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minuto
        limit: 10,  // máximo 10 peticiones
      },
    ]),
    AuthModule,
    FinanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 2. Forma estándar y limpia de aplicar el Guard globalmente
    // NestJS se encarga automáticamente de inyectar el Reflector y las opciones.
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}