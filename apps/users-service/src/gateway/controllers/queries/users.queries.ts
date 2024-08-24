import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '../../../users/services/users.service';
import { UsersServiceGetUsersQuery } from '@gateway-architecture/contracts';

@Controller()
export class UsersQueries {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users-service.get-users.query')
  getUsersQuery(): UsersServiceGetUsersQuery.Response[] {
    return this.usersService.find();
  }
}
