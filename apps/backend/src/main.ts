import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global Validation (WAJIB buat DTO lo jalan)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang field yang gak ada di DTO
      transform: true, // auto convert (string → Date, dll)
      forbidNonWhitelisted: true, // error kalau ada field aneh
      stopAtFirstError: true, // cukup kasih tau error pertama aja
      transformOptions: {
        enableImplicitConversion: true, // auto convert (string → number, dll)
      },
    }),
  );

  // ✅ Optional: enable CORS (biar Next.js lo bisa akses)
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
