import { Account } from '../SimpleTable/types';

interface RequestDetailsProps {
  hideDetails: () => void;
  deleteRequest: (requestId: string) => void; 
  requestId: string;
  account: Account;

}

export default RequestDetailsProps;
