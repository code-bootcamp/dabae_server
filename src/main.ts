import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModuleLocal } from './app.moduleLocal';

async function bootstrap() {
  const app = await NestFactory.create(AppModuleLocal);
  app.use(graphqlUploadExpress());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:5500',
      'https://dabae.co.kr',
    ],
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
  });
  await app.listen(3000);
}
bootstrap();
