import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validate incoming request data using DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Allow requests from your Next.js frontend
  app.enableCors();

  const port = process.env.PORT ?? 3001;
await app.listen(port, () => {
  console.log(`Application is running on: http://localhost:${port}`);
});
}

bootstrap();