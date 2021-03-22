import React, { useCallback } from 'react';
import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import Props from './types';
import useStyles from './styles';
import useSignupStyles from '../styles';
import { SignupNavigationButton } from '../../../components';

const AgentSignup: React.FC<Props> = ({
  signupStateValues,
  handleStateChange,
  prevStep,
  nextStep,
}: Props) => {
  const classes = useStyles();
  const signupClasses = useSignupStyles();

  const handleNext = useCallback(() => {
    const {
      brokerageName,
      brokeragePhone,
      brokerageAddress,
      license,
    } = signupStateValues;
    if (!brokerageName || !brokeragePhone || !brokerageAddress || !license) {
      alert('Missing fields!');
    } else {
      nextStep();
    }
  }, [signupStateValues, nextStep]);

  return (
    <Paper className={signupClasses.paper} elevation={5}>
      <Typography className={signupClasses.title} color="primary" variant="h3">
        Agent Signup
      </Typography>
      <Typography variant="body1">
        We will need to verify your real estate registration details. Please
        provide additional information below.
      </Typography>
      <FormControl component="form" fullWidth variant="filled">
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.brokerageName}
          onChange={(e) => handleStateChange(e, 'brokerageName')}
          label="Brokerage name"
          fullWidth
          required
        />
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.brokeragePhone}
          onChange={(e) => handleStateChange(e, 'brokeragePhone')}
          label="Brokerage phone number"
          fullWidth
          required
        />
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.brokerageAddress}
          onChange={(e) => handleStateChange(e, 'brokerageAddress')}
          label="Brokerage address"
          fullWidth
          required
        />
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.license}
          onChange={(e) => handleStateChange(e, 'license')}
          label="License"
          fullWidth
          required
        />
        <SignupNavigationButton isBack {...{ prevStep }} />
        {/* this button would call a function that would call createUser from the context */}
        <Button
          className={classes.button}
          onClick={handleNext}
          color="primary"
          variant="contained"
        >
          Create account
        </Button>
      </FormControl>
    </Paper>
  );
};

export default AgentSignup;
