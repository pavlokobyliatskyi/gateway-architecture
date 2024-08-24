import { CreateUserDto } from './../../../users/services/dto/create-user.dto';
import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SlugService } from '../../../slug/services/slug.service';
import { UsersService } from '../../../users/services/users.service';
import { UsersServiceCreateUserCommandContract } from '@gateway-architecture/contracts';
import { EmailExistsPipe, ZodValidationPipe } from '../../pipes';

@Controller()
export class UsersCommands {
  constructor(
    private readonly slugService: SlugService,
    private readonly usersService: UsersService
  ) {}

  @MessagePattern('users-service.create-user.command')
  @UsePipes(
    new ZodValidationPipe(UsersServiceCreateUserCommandContract.RequestSchema)
  )
  @UsePipes(EmailExistsPipe)
  createUserCommand(
    @Payload() args: UsersServiceCreateUserCommandContract.Request
  ): UsersServiceCreateUserCommandContract.Response {
    // Count users
    const count = this.usersService.count();

    // Create a slug from firsName and lastName
    const slug = this.slugService.slug(`${args.firstName} ${args.lastName}`);

    // Create an username
    const username = `${slug}#${count}`;

    const user = new CreateUserDto();

    user.firstName = args.firstName;
    user.lastName = args.lastName;
    user.email = args.email;
    user.username = username;

    return this.usersService.create(user);
  }
}
