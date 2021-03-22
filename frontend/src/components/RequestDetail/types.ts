import { Account } from '../AuthRequestTable/types';

interface RequestDetailsProps {
  hideDetails: () => void;
  deleteRequest: (requestId: string) => void; 
  requestId: string;
  account: Account|null;

}

export default RequestDetailsProps;
