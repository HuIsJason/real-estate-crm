import { User } from '../../utils/types';

export interface UserContextType {
  user: User;
  loginUser: () => void;
  logoutUser: () => void;
}
