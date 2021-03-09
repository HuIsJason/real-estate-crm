import React from 'react';
import { FormControl, Paper, TextField, Typography } from '@material-ui/core';

import Props from './types';
import useSignupStyles from '../styles';
import { SignupNavigationButton } from '../../../components';

const InitialSignup: React.FC<Props> = ({
  signupStateValues,
  handleStateChange,
  nextStep,
}: Props) => {
  const signupClasses = useSignupStyles();

  return (
    <Paper className={signupClasses.paper} elevation={5}>
      <Typography className={signupClasses.title} color="primary" variant="h3">
        Signup
      </Typography>
      <Typography variant="body1">
        Please enter your account details.
      </Typography>
      <FormControl
        onSubmit={nextStep}
        component="form"
        fullWidth
        variant="filled"
      >
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.firstName}
          onChange={(e) => handleStateChange(e, 'firstName')}
          label="First name"
          fullWidth
          required
        />
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.lastName}
          onChange={(e) => handleStateChange(e, 'lastName')}
          label="Last name"
          fullWidth
          required
        />
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.email}
          onChange={(e) => handleStateChange(e, 'email')}
          label="Email"
          type="email"
          fullWidth
          required
        />
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.password}
          onChange={(e) => handleStateChange(e, 'password')}
          label="Password"
          type="password"
          fullWidth
          required
        />
      </FormControl>
      <SignupNavigationButton {...{ nextStep }} />
    </Paper>
  );
};

export default InitialSignup;
