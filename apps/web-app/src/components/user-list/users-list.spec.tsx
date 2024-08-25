import '@testing-library/jest-dom';

import * as uuid from 'uuid';

import { IUsersContext, UsersContext } from '../.././context';
import { render, screen } from '@testing-library/react';

import { UserList } from './users-list';

describe('UserList Component', () => {
  const renderComponent = (contextValues: Partial<IUsersContext>) => {
    return render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <UsersContext.Provider value={contextValues}>
        <UserList />
      </UsersContext.Provider>
    );
  };

  test('displays loading state', () => {
    renderComponent({ isLoading: true });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('displays users list', () => {
    const users = [
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

    renderComponent({ users, isLoading: false });

    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Jane/)).toBeInTheDocument();
  });

  test('displays error message', () => {
    const error = 'Could not get users.';

    renderComponent({ error, isLoading: false });

    expect(screen.getByText(new RegExp(error))).toBeInTheDocument();
  });
});
