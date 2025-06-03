import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Twój frontend
    credentials: true,
    exposedHeaders: ['Authorization'], // ← DODAJ TO!
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // await app.listen(process.env.PORT ?? 3001);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') ?? 3001;
  await app.listen(port);
}
bootstrap();
