interface AccountDetailProps {
  hideDetails: () => void;
  deleteAccount: (accountEmail: string) => void; 
  accountEmail: string
}

export default AccountDetailProps;
