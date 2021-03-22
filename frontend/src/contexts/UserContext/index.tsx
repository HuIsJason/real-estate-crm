import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import UserContextType from './types';
import { ProviderProps as Props } from '../types';
import { User } from '../../utils/types';

const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin',
    type: 'ADMIN',
  },
  {
    username: 'user',
    password: 'user',
    id: '2',
    firstName: 'Jason',
    lastName: 'Hu',
    bio: 'Selling your house ASAP!',
    yearCreated: 2021,
    address: '18 Rainsford Road',
    phone: '416-909-3633',
    email: 'jasonn.hu@mail.utoronto.ca',
    licenseId: '232-324234-32432',
    brokerage: 'Remax',
    brokerageAddress: '100 Fundy Bay Blvd',
    brokeragePhone: '416-867-1111',
    specialization: 'SELLER',
    type: 'AGENT',
  },
];

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType =>
  useContext(UserContext) as UserContextType;

const UserProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User>(null);

  const loginUser = useCallback((username: string, password: string) => {
    /**
     * here there would be the login server call to log in a user
     */
    if (username === 'admin' && password === 'admin') {
      setUser(users[0]);
    } else if (username === 'user' && password === 'user') {
      setUser(users[1]);
    } else {
      alert('Invalid credentials!');
    }
  }, []);

  const logoutUser = useCallback(() => {
    /**
     * here there would be a server call to log out the current user
     */
    setUser(null);
  }, []);

  const createUser = useCallback((newUser: any) => {
    /**
     * here there would be a server call to create a new user
     */
    newUser.id = uuid();
    newUser.yearCreated = '2021';
    users.push(newUser);
  }, []);

  const providerValue = useMemo(
    (): UserContextType => ({ user, loginUser, logoutUser, createUser }),
    [user, loginUser, logoutUser, createUser]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
