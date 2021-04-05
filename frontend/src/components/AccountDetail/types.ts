import { Agent } from '../../utils/types';

interface AccountDetailProps {
  hideDetails: () => void;
  deleteAccount: (username: string) => void; 
  username: string;
  account: Agent;
}

export default AccountDetailProps;
