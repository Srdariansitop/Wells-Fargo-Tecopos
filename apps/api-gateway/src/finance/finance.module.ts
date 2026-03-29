import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FinanceController } from './finance.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FINANCE_CLIENT',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('FINANCE_HOST', '127.0.0.1'),
            port: configService.get('FINANCE_PORT', 3002),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [FinanceController],
})
export class FinanceModule {}