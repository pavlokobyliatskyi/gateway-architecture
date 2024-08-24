import { Module } from '@nestjs/common';
import { SlugModule } from '../slug/slug.module';
import { UsersCommands } from './controllers/commands/users.commands';
import { UsersModule } from '../users/users.module';
import { UsersQueries } from './controllers/queries/users.queries';

@Module({
  imports: [UsersModule, SlugModule],
  controllers: [UsersCommands, UsersQueries],
})
export class GatewayModule {}
