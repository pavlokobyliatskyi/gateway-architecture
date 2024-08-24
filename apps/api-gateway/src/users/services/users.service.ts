import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private usersService: ClientProxy) {}

  async createUser(args: any) {
    return await firstValueFrom(
      this.usersService.send('users-service.create-user.command', args)
    );
  }

  async getUsers() {
    return await firstValueFrom(
      this.usersService.send('users-service.get-users.query', {})
    );
  }
}
