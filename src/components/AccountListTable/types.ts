interface TableProps {
  accountSummaries: AccountSummary[];
  onSelectRow: (accountEmail: string) => void;
}

interface TableRowProps {
  email: string;
  lastLogin: string;
  onClick: () => void;
}

interface AccountSummary {
  accountEmail: string,
  lastLogin: string,
}

interface Account { 
  email: string,
  firstName: string,
  lastName: string,
  licenseId: string,
  phone: string,
  brokerage: string,
  brokerageAddress: string,
  brokeragePhone: string
}

export default TableProps;
export type { TableRowProps, AccountSummary, Account } ;
