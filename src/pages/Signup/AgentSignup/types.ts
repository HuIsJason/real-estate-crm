import { ISignupState } from '../types';

interface AgentSignupProps {
  signupStateValues: ISignupState;
  handleStateChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => void;
  prevStep: () => void;
  nextStep: () => void;
}

export default AgentSignupProps;
