import { User } from '../../utils/types';

interface UserContextType {
  user: User;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  createUser: (newUser: any) => void;
}

export default UserContextType;
