import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const host = process.env.SSO_BIND_HOST || '0.0.0.0';
  const port = Number(process.env.SSO_PORT || 3001);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  
  await app.listen();
  console.log(`SSO Microservice is listening on ${host}:${port}`);
}
bootstrap();