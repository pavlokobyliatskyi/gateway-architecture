import {
  ApiUsersGetUsersContract,
  ErrorResponse,
  SuccessResponse,
} from '@gateway-architecture/contracts';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { axios } from '../../utils';
import { isAxiosError } from 'axios';

export interface IUsersContext {
  users: ApiUsersGetUsersContract.Response;
  isLoading: boolean;
  error: string | null;
  setUsers: (users: ApiUsersGetUsersContract.Response) => void;
}

export const UsersContext = createContext<IUsersContext>({
  users: [],
  isLoading: false,
  error: null,
  setUsers: () => null,
});

export const UsersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<ApiUsersGetUsersContract.Response>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<
          SuccessResponse<ApiUsersGetUsersContract.Response>
        >('/users');
        setUsers(response.data.data);
      } catch (e) {
        if (isAxiosError(e)) {
          const data: ErrorResponse = e.response?.data;
          setError(data?.message || 'Could not get users.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const value = {
    users,
    isLoading,
    error,
    setUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
