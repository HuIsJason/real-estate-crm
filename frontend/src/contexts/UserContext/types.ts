import { User } from '../../utils/types';

interface IState {
  loggedInAs: string;
  MongoId: string;
  username: string;
  accountType: 'agent' | 'admin';
}

export type UserState = IState | null;

interface UserContextType {
  user: UserState;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  createUser: (newUser: any) => void;
  checkSession: () => void;
}

export default UserContextType;
