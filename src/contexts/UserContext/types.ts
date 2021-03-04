import { User } from '../../utils/types';

export interface UserContextType {
  user: User;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
}
