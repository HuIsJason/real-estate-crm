import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { UserState, default as UserContextType } from './types';
import { ProviderProps as Props } from '../types';
import { Agent, User } from '../../utils/types';
import send from '../../requests/request';

const users: User[] = [
  {
    _id: '1',
    username: 'admin',
    password: 'admin',
    accountType: 'admin',
  },
  {
    username: 'user',
    password: 'user',
    _id: '2',
    firstName: 'Jason',
    lastName: 'Hu',
    bio: 'Selling your house ASAP!',
    yearStarted: 2021,
    phone: '416-909-3633',
    email: 'jasonn.hu@mail.utoronto.ca',
    licenseId: '232-324234-32432',
    brokerage: 'Remax',
    brokerageAddress: '100 Fundy Bay Blvd',
    brokerageNumber: '416-867-1111',
    specialization: 'SELLER',
    accountType: 'agent',
  },
];

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType =>
  useContext(UserContext) as UserContextType;

const UserProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<UserState>(null);

  const loginUser = useCallback(async (username: string, password: string) => {
    try {
      const response = await send('login', { username, password });
      if (response.status === 401) {
        alert('Account has not been activated yet!');
      } else {
        const responseJson = await response.json();
        setUser(responseJson);
      }
    } catch (err) {
      alert('Invalid credentials!');
    }
    // if (username === 'admin' && password === 'admin') {
    //   setUser(users[0]);
    // } else if (username === 'user' && password === 'user') {
    //   setUser(users[1]);
    // } else {
    //   alert('Invalid credentials!');
    // }
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      await send('logout');
      setUser(null);
    } catch (err) {
      alert('Error with logging out :(');
    }
  }, []);

  const createUser = useCallback(async (signupInfo: Agent) => {
    try {
      await send('signup', signupInfo);
    } catch (err) {
      throw 'Signup failed';
    }
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const response = await send('checkSession');
      const responseJson = await response.json();
      if (responseJson && responseJson.loggedInAs) {
        setUser(responseJson);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const providerValue = useMemo(
    (): UserContextType => ({
      user,
      loginUser,
      logoutUser,
      createUser,
      checkSession,
    }),
    [user, loginUser, logoutUser, createUser, checkSession]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
