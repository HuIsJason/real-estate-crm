import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@material-ui/core';

import InitialSignup from './InitialSignup';
import SelectAccountType from './SelectAccountType';

const UserForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isAgent, setIsAgent] = useState<boolean>(false);

  const signupState = useMemo(
    () => ({ firstName, lastName, email, password, confirmPassword }),
    [firstName, lastName, email, password, confirmPassword]
  );

  const prevStep = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const nextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handleFormChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword'
    ) => {
      const input = e.currentTarget.value;

      switch (type) {
        case 'firstName':
          setFirstName(input);
          break;
        case 'lastName':
          setLastName(input);
          break;
        case 'email':
          setEmail(input);
          break;
        case 'password':
          setPassword(input);
          break;
        case 'confirmPassword':
          setConfirmPassword(input);
          break;
      }
    },
    []
  );

  const handleAccountTypeChange = useCallback(() => setIsAgent(true), []);

  switch (step) {
    case 1:
      return <InitialSignup {...{ signupState, handleFormChange, nextStep }} />;
    case 2:
      return (
        <SelectAccountType
          {...{ handleAccountTypeChange, prevStep, nextStep }}
        />
      );
    case 3:
      return (
        <>
          <Paper>
            <Typography variant="h4">Agent sign up</Typography>
            <Button onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next</Button>
          </Paper>
        </>
      );
    case 4:
      return (
        <>
          <Paper>
            <Typography variant="h4">Thank you</Typography>
            <Typography variant="body1">
              Return to <Link to="/login">Login Page</Link>
            </Typography>
          </Paper>
        </>
      );
    default:
      return <></>;
  }
};

export default UserForm;
