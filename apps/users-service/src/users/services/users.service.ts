import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  // If you use typeorm or prisma, you dont need create external repository.
  constructor(private readonly userRepository: UserRepository) {}

  create(args: CreateUserDto) {
    const userEntity = new UserEntity({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      username: args.username,
    });

    return this.userRepository.create(userEntity);
  }

  find() {
    return this.userRepository.find();
  }

  count() {
    return this.userRepository.count();
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
