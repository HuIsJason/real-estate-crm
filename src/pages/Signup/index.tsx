import React, { useCallback, useMemo, useState } from 'react';

import { ISignupState } from './types';
import InitialSignup from './InitialSignup';
import AgentSignup from './AgentSignup';
import Confirmation from './Confirmation';

const UserForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [signupState, setSignupState] = useState<ISignupState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    brokerageName: '',
    brokeragePhone: '',
    brokerageAddress: '',
    license: '',
  });

  const handleStateChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: string
    ) => {
      setSignupState({ ...signupState, [type]: e.currentTarget.value });
    },
    [signupState]
  );

  const signupStateValues = useMemo(() => signupState, [signupState]);

  const prevStep = useCallback(() => setStep(step - 1), [step]);

  const nextStep = useCallback(() => setStep(step + 1), [step]);

  switch (step) {
    case 1:
      return (
        <InitialSignup
          {...{
            signupStateValues,
            handleStateChange,
            nextStep,
          }}
        />
      );
    case 2:
      return (
        /**
         * the AgentSignup page would be provided a function that would call createUser() from the
         * provider which would then make the server call to create a user
         */
        <AgentSignup
          {...{ signupStateValues, handleStateChange, prevStep, nextStep }}
        />
      );
    case 3:
      return <Confirmation />;
    default:
      return <></>;
  }
};

export default UserForm;
