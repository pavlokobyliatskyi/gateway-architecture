import * as uuid from 'uuid';

import {
  ApiUsersCreateUserContract,
  ApiUsersGetUsersContract,
} from '@gateway-architecture/contracts';
import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule } from './../../../users/users.module';
import { UsersService } from '../../../users/services/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: ApiUsersCreateUserContract.Request = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };

      const expectedResponse: ApiUsersCreateUserContract.Response = {
        id: uuid.v4(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'john-doe#0',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'createUser').mockImplementation(async () => {
        return expectedResponse;
      });

      const result = await controller.createUser(createUserDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error if external service returns error', async () => {
      const createUserDto: ApiUsersCreateUserContract.Request = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };

      jest.spyOn(service, 'createUser').mockImplementation(() => {
        throw new Error('Could not create a user.');
      });

      try {
        await controller.createUser(createUserDto);
        fail('An error is expected.');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Could not create a user.');
      }
    });
  });

  describe('getUsers', () => {
    it('should return users', async () => {
      const expectedResponse: ApiUsersGetUsersContract.Response = [
        {
          id: uuid.v4(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          username: 'john-doe#0',
          createdAt: new Date(),
        },
        {
          id: uuid.v4(),
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          username: 'jane-doe#0',
          createdAt: new Date(),
        },
      ];

      jest.spyOn(service, 'getUsers').mockImplementation(async () => {
        return expectedResponse;
      });

      const result = await controller.getUsers();
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error if external service returns error', async () => {
      jest.spyOn(service, 'getUsers').mockImplementation(() => {
        throw new Error('Could not get users.');
      });

      try {
        await controller.getUsers();
        fail('An error is expected.');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Could not get users.');
      }
    });
  });
});
