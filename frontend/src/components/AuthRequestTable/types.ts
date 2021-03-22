interface TableProps {
  requests: Request[];
  selectRequest: (requestId: string) => void;
  displayPage: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}

interface TableRowProps {
  requestId: string; 
  email: string;
  dateOfRequest: string;
  onClick: () => void;
}

interface Request {
  requestId: string, 
  accountEmail: string,
  dateOfRequest: string
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
export type { TableRowProps, Request, Account } ;
