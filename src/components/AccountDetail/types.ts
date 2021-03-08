import { AgentAccount, ClientAccount } from '../AccountListTable/types';

interface AccountDetailProps {
  hideDetails: () => void;
  deleteAccount: (accountEmail: string) => void; 
  accountEmail: string
}

export default AccountDetailProps;
