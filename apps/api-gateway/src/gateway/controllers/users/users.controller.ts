import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { UsersService } from '../../../users/services/users.service';
import {
  ApiUsersCreateUserContract,
  ApiUsersGetUsersContract,
} from '@gateway-architecture/contracts';
import { ZodValidationPipe } from '../../pipes';
import { SuccessResponseInterceptor } from '../../interceptors';

@Controller('/users')
@UseInterceptors(SuccessResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(ApiUsersCreateUserContract.RequestSchema))
  async createUser(
    @Body() args: ApiUsersCreateUserContract.Request
  ): Promise<ApiUsersCreateUserContract.Response> {
    try {
      return await this.usersService.createUser({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
      });
    } catch (e) {
      throw new BadRequestException(e?.message || 'Could not create a user.');
    }
  }

  @Get()
  async getUsers(): Promise<ApiUsersGetUsersContract.Response> {
    try {
      return await this.usersService.getUsers();
    } catch (e) {
      throw new BadRequestException(e?.message || 'Could not get users.');
    }
  }
}
