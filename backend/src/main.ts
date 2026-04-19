import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS for frontend
  const frontendUrl = process.env.FRONTEND_URL;

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Lead Tracker API')
    .setDescription('CRM API for managing leads and comments')
    .setVersion('1.0')
    .addTag('leads', 'Lead management endpoints')
    .addTag('comments', 'Comment management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  // console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
