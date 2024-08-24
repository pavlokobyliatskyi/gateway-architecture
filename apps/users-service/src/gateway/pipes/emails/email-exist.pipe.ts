import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';
import { UsersService } from './../../../users/services/users.service';

@Injectable()
export class EmailExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const isEmail = this.usersService.findOneByEmail(value.email);

    if (isEmail) {
      throw new RpcException(`User with email ${value.email} already exists.`);
    }

    return value;
  }
}
