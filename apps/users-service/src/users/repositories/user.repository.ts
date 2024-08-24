import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  // For example simulate the database.
  private readonly database: UserEntity[] = [];

  create(args: UserEntity) {
    this.database.push(args);
    return args;
  }

  find(): Required<UserEntity[]> {
    return this.database;
  }

  count() {
    return this.database.length;
  }

  findOneBy(args: Partial<Pick<UserEntity, 'id' | 'email' | 'username'>>) {
    return this.database.find(
      (user) =>
        user.id === args.id ||
        user.email === args.email ||
        user.username === args.username
    );
  }
}
