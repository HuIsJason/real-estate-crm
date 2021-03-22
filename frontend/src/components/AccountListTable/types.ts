interface TableProps {
  accountSummaries: AccountSummary[];
  onSelectRow: (accountEmail: string) => void;
  displayPage: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}

interface TableRowProps {
  email: string;
  lastLogin: string;
  onClick: () => void;
}

interface AccountSummary {
  accountEmail: string,
  lastLogin: string,
  accountType: 'client' | 'agent',
}

interface Account {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
}

interface AgentAccount extends Account {
  type: 'agent', 
  licenseId: string,
  brokerage: string,
  brokerageAddress: string,
  brokeragePhone: string
}

interface ClientAccount extends Account {
  type: 'client',
}

export default TableProps;
export type { TableRowProps, AccountSummary, AgentAccount, ClientAccount } ;
