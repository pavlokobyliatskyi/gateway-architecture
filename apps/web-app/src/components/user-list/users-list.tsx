import { UsersContext } from '../../context';
import { useContext } from 'react';

export const UserList = () => {
  const { users, isLoading, error } = useContext(UsersContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
};
