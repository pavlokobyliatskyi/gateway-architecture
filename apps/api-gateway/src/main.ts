import { CatchEverythingExceptions } from './gateway/exceptions/catch/catch-everything.exceptions';
import { GatewayModule } from './gateway/gateway.module';
import { NestFactory } from '@nestjs/core';

async function main() {
  const app = await NestFactory.create(GatewayModule);

  app.useGlobalFilters(new CatchEverythingExceptions());

  app.enableCors();

  await app.listen(3001);
}

main();
