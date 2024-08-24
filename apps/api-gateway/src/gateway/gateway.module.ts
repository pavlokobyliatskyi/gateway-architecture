import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
})
export class GatewayModule {}
