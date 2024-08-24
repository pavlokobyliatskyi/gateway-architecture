import { CreateUserForm } from '../../forms';
import { UserList } from '../../components';

export const Home = () => {
  return (
    <div>
      <h1>Users:</h1>
      <hr />
      <CreateUserForm />
      <hr />
      <UserList />
    </div>
  );
};
