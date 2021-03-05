import { Account } from '../AccountListTable/types';

interface AccountDetailProps {
  hideDetails: () => void;
  deleteAccount: (accountEmail: string) => void; 
  account: Account;

}

export default AccountDetailProps;
