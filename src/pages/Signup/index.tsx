import React, { useCallback, useMemo, useState } from 'react';

import { ISignupState } from './types';
import InitialSignup from './InitialSignup';
import SelectAccountType from './SelectAccountType';
import AgentSignup from './AgentSignup';
import Confirmation from './Confirmation';

const UserForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isAgent, setIsAgent] = useState<boolean>(false);
  const [signupState, setSignupState] = useState<ISignupState>(
    {} as ISignupState
  );

  const handleStateChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: string
    ) => {
      setSignupState({ ...signupState, [type]: e.currentTarget.value });
      // console.log(signupState, type, e.currentTarget.value);
    },
    [signupState]
  );

  const signupStateValues = useMemo(() => signupState, [signupState]);

  const prevStep = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const nextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handleAccountTypeChange = useCallback(
    (agent: boolean) => {
      setIsAgent(agent);
      nextStep();
    },
    [nextStep]
  );

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
        <SelectAccountType
          {...{ handleAccountTypeChange, prevStep, nextStep }}
        />
      );
    case 3:
      if (isAgent) {
        return (
          <AgentSignup
            {...{ signupStateValues, handleStateChange, prevStep, nextStep }}
          />
        );
      } else {
        return <Confirmation />;
      }
    case 4:
      return <Confirmation />;
    default:
      return <></>;
  }
};

export default UserForm;
