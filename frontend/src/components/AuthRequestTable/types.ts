import { Agent } from "../../utils/types";

interface TableProps {
  accounts: Agent[];
  selectRequest: (accountId: string) => void;
  displayPage: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}

interface TableRowProps {
  username: string; 
  email: string;
  dateOfSignUp?: string;
  onClick: () => void;
}

export default TableProps;
export type { TableRowProps } ;
