import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './configs/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 3000

  //config versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1", "2"]
  })

  //auto-validation
  app.useGlobalPipes(new ValidationPipe());

  //cors error
  app.enableCors({ origin: configService.get('FRONTEND_URI') ?? 'http://localhost:5173' });

  //transform interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
