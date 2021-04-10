import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  handleCreateUser,
  handleStateChange,
  prevStep,
  nextStep,
}: Props) => {
  const classes = useStyles();
  const signupClasses = useSignupStyles();

  const handleNext = useCallback(() => {
    const {
      brokerage,
      brokerageNumber,
      brokerageAddress,
      licenseId,
    } = signupStateValues;
    if (!brokerage || !brokerageNumber || !brokerageAddress || !licenseId) {
      alert('Missing fields!');
    } else {
      try {
        handleCreateUser();
      } catch (err) {
        alert(err);
      } finally {
        nextStep();
      }
    }
  }, [handleCreateUser, signupStateValues, nextStep]);

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
          value={signupStateValues.brokerage}
          onChange={(e) => handleStateChange(e, 'brokerage')}
          label="Brokerage name"
          fullWidth
          required
        />
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.brokerageNumber}
          onChange={(e) => handleStateChange(e, 'brokerageNumber')}
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
          value={signupStateValues.licenseId}
          onChange={(e) => handleStateChange(e, 'licenseId')}
          label="License"
          fullWidth
          required
        />
        <SignupNavigationButton isBack {...{ prevStep }} />
        <Button
          className={classes.button}
          onClick={handleNext}
          color="primary"
          variant="contained"
        >
          Create account
        </Button>
        <br/>
        <Typography variant="caption">
        <Link to="/login">OR RETURN TO LOGIN</Link>
      </Typography>
      </FormControl>
    </Paper>
  );
};

export default AgentSignup;
