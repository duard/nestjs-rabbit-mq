import { Logger } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log(
    `------------------------------------------------------------------`,
  );
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'cats_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  const config = app.get(ConfigService);
  const globalPrefix = 'api';
  const port = config.get('simples_api.port') || 3333;
  const name = config.get('simples_api.name') || 'NO-NAME';
  Logger.log(
    `🚀 running on: http://localhost:${port}/${globalPrefix}`,
    `${name} !!`,
  );
}

bootstrap();
