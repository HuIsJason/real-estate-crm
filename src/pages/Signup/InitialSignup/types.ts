interface InitialSignupProps {
  signupState: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword'
  ) => void;
  nextStep: () => void;
}

export default InitialSignupProps;
