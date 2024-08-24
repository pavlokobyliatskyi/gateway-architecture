import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { GatewayModule } from './gateway/gateway.module';
import { NestFactory } from '@nestjs/core';

async function main() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GatewayModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      },
    }
  );

  await app.listen();
}

main();
