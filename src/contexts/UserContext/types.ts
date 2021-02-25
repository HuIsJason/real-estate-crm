import { User } from '../types';

export interface UserProviderProps {
  children: React.ReactNode;
}

export interface UserContextType {
  user: User;
  loginUser: () => void;
  logoutUser: () => void;
}
