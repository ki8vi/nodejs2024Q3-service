import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';
import { serve, setup } from 'swagger-ui-express';
import 'dotenv/config';

const PORT = process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDoc = load(readFileSync('./doc/api.yaml', 'utf8'));
  app.use('/doc', serve, setup(swaggerDoc));

  await app.listen(PORT);
}
bootstrap();
