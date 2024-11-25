import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';
import { serve, setup } from 'swagger-ui-express';
import 'dotenv/config';
import { Logger } from './customLogger/customLogger';

const PORT = process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDoc = load(readFileSync('./doc/api.yaml', 'utf8'));
  const logger = app.get(Logger);

  process.on('uncaughtException', (error: Error) => {
    logger.fatal(`UNCAUGHT EXCEPTION: ${error.message}`, error.stack);
  });

  process.on(
    'unhandledRejection',
    (reason: string, promise: Promise<unknown>) => {
      logger.error(`UNHANLED REJECTION: ${reason}`, promise);
    },
  );

  app.use('/doc', serve, setup(swaggerDoc));

  await app.listen(PORT);
}
bootstrap();

// setTimeout(() => {
//   throw new Error('test');
// }, 1000);

// setTimeout(() => {
//   Promise.reject('tests');
// }, 1000);
