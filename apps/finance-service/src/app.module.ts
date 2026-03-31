import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { existsSync } from 'node:fs';

const isRunningInDocker = existsSync('/.dockerenv');
const defaultKafkaBroker = isRunningInDocker ? 'kafka:9092' : 'localhost:9092';

@Module({
  imports: [HttpModule ,ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || defaultKafkaBroker],
          },
          consumer: {
            groupId: 'finance-consumer', // Un nombre para el grupo de consumidores
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
