import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { UserContextType } from './types';
import { ProviderProps as Props } from '../types';
import { User } from '../../utils/types';

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType =>
  useContext(UserContext) as UserContextType;

const UserProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User>(null);

  const loginUser = useCallback((username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setUser({
        id: 1,
        firstName: 'Mr',
        lastName: 'Admin',
        bio: 'Application administrator.',
        yearCreated: 2021,
        address: "27 King's College Circle",
        phone: '416-978-2011',
        email: 'admin@mail.utoronto.ca',
        brokerage: '',
        specialization: 'SELLER',
      });
    } else if (username === 'user' && password === 'user') {
      setUser({
        id: 1,
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
      });
    } else {
      alert('Invalid credentials!');
    }
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
