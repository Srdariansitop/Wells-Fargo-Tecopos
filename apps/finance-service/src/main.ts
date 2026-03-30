import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const host = process.env.FINANCE_BIND_HOST || '0.0.0.0';
  const port = Number(process.env.FINANCE_PORT || 3002);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );

  await app.listen();
  console.log(`Finance Microservice is listening via TCP on ${host}:${port}`);
}
bootstrap();