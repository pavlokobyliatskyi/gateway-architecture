import * as uuid from 'uuid';

import { IUser } from '../interfaces/user.interface';

export class UserEntity implements IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdAt?: Date;

  constructor(args: Omit<IUser, 'id' | 'createdAt'>) {
    this.id = uuid.v4();
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.email = args.email;
    this.username = args.username;
    this.createdAt = new Date();
  }
}
