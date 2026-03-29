import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('TECOPOS - Wells Fargo API')
    .setDescription('Gateway para la integración de operaciones bancarias y SSO')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // El Gateway escuchará en el puerto 3000
  await app.listen(3000);
  console.log(`🚀 API Gateway corriendo en: http://localhost:3000/api/v1`);
  console.log(`📚 Documentación Swagger en: http://localhost:3000/docs`);
}
bootstrap();