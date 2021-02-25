import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { UserProviderProps as Props, UserContextType } from './types';
import { User } from '../types';

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType =>
  useContext(UserContext) as UserContextType;

const UserProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User>(null);

  const loginUser = useCallback(() => {
    setUser({
      id: 1,
      name: 'Jason Hu',
      bio: "I'll sell your house ASAP",
      yearCreated: 2021,
      address: '18 Rainsford Road',
      phone: '416-909-3633',
      email: 'jasonn.hu@mail.utoronto.ca',
      brokerage: 'Remax',
      specialization: 'SELLER',
    });
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
  }, []);

  const providerValue = useMemo(
    (): UserContextType => ({ user, loginUser, logoutUser }),
    [user, loginUser, logoutUser]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
