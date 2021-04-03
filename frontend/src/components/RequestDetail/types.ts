import { Agent } from '../../utils/types';

interface RequestDetailsProps {
  hideDetails: () => void;
  deleteRequest: (requestId: string) => void; 
  account: Agent|null;
  username: string;

}

export default RequestDetailsProps;
