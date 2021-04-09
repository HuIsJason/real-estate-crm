import { Account } from "../../utils/types";

interface TableProps {
  accounts: Account[];
  onSelectRow: (username: string) => void;
  displayPage: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}

interface TableRowProps {
  username: string;
  lastLogin?: string;
  onClick: () => void;
}

export default TableProps;
export type { TableRowProps } ;
