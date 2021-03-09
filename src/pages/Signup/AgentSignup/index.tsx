import React from 'react';
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

  return (
    <Paper className={signupClasses.paper} elevation={5}>
      <Typography className={signupClasses.title} color="primary" variant="h3">
        Agent Signup
      </Typography>
      <Typography variant="body1">
        We will need to verify your real estate registration details. Please
        provide additional information below.
      </Typography>
      <FormControl
        onSubmit={nextStep}
        component="form"
        fullWidth
        variant="filled"
      >
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
      </FormControl>
      <div>
        <SignupNavigationButton isBack {...{ prevStep, nextStep }} />
        <Button
          className={classes.button}
          onClick={nextStep}
          color="primary"
          variant="contained"
        >
          Create account
        </Button>
      </div>
    </Paper>
  );
};

export default AgentSignup;
