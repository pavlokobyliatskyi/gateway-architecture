import { GatewayModule } from './gateway/gateway.module';
import { NestFactory } from '@nestjs/core';

async function main() {
  const app = await NestFactory.create(GatewayModule);
  await app.init();
}

main();
