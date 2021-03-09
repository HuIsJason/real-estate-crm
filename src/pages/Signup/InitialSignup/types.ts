import { ISignupState } from '../types';

interface InitialSignupProps {
  signupStateValues: ISignupState;
  handleStateChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => void;
  nextStep: () => void;
}

export default InitialSignupProps;
