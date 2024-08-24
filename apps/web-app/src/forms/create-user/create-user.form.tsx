import {
  ApiUsersCreateUserContract,
  ErrorResponse,
  SuccessResponse,
} from '@gateway-architecture/contracts';
import { useContext, useState } from 'react';

import { UsersContext } from '../../context';
import { axios } from '../../utils';
import { faker } from '@faker-js/faker';
import { isAxiosError } from 'axios';

export const CreateUserForm = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [fakeUserData, setFakeUserData] = useState({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
  });

  const handleCreateUser = async () => {
    try {
      const response = await axios.post<
        SuccessResponse<ApiUsersCreateUserContract.Response>
      >('/users', fakeUserData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.data.data);

      setUsers([response.data.data, ...users]);

      setFakeUserData({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
      });
    } catch (e) {
      if (isAxiosError(e)) {
        const data: ErrorResponse = e.response?.data;
        console.error(data?.message || 'Could not create a user.');
      }
    }
  };

  return (
    <div>
      <h2>Fake User Data:</h2>
      <ul>
        <li>First Name: {fakeUserData.firstName}</li>
        <li>Last Name: {fakeUserData.lastName}</li>
        <li>Email: {fakeUserData.email}</li>
      </ul>
      <button onClick={handleCreateUser}>Create</button>
    </div>
  );
};
