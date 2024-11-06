import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

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

  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
