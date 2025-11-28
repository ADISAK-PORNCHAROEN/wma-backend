import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Prefix API
  app.setGlobalPrefix('api/v1');

  // ✅ Validation สำหรับ DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // ✅ รองรับ Cookie (ถ้ายังอยากใช้ร่วมกับบาง route)
  app.use(cookieParser());

  // ✅ เปิด CORS
  app.enableCors({
    origin: ['http://localhost:4002', `${process.env.FRONTEND_URL}`],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  });

  const config = new DocumentBuilder()
    .setTitle('OPM API')
    .setDescription(
      'ระบบยืนยันตัวตนและจัดการ Session (OTP, JWT Bearer, Revoke)',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // ชื่อ security scheme (ใช้กับ @ApiBearerAuth())
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/docs', app, document, {
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
  });

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server started on http://localhost:${port}`);
  console.log(`📘 Swagger running at http://localhost:${port}/api/v1/docs`);
}
void bootstrap();
