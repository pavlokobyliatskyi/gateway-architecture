import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';

@Module({
  providers: [UserRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
