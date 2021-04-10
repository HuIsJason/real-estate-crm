import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
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

  const handleNext = useCallback(() => {
    const {
      username,
      firstName,
      lastName,
      email,
      phone,
      password,
    } = signupStateValues;
    if (
      !username ||
      !phone ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !validateEmail(signupStateValues.email) ||
      !validatePhone(signupStateValues.phone)
    ) {
      alert('Missing fields/invalid input!');
    } else {
      nextStep();
    }
  }, [signupStateValues, nextStep]);

  const validateEmail = (email: string) => {
    const regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
  };

  const validatePhone = (phone: string) => {
    const regex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(phone);
  };

  return (
    <Paper className={signupClasses.paper} elevation={5}>
      <Typography className={signupClasses.title} color="primary" variant="h3">
        Signup
      </Typography>
      <Typography variant="body1">
        Please enter your account details.
      </Typography>
      <FormControl component="form" fullWidth variant="filled">
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.username}
          onChange={(e) => handleStateChange(e, 'username')}
          label="Username"
          fullWidth
          required
        />
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
          helperText={
            validateEmail(signupStateValues.email) ? '' : 'Invalid email.'
          }
          error={!validateEmail(signupStateValues.email)}
          fullWidth
          required
        />
        <TextField
          className={signupClasses.textField}
          value={signupStateValues.phone}
          onChange={(e) => handleStateChange(e, 'phone')}
          label="Phone number"
          helperText={
            validatePhone(signupStateValues.phone)
              ? ''
              : 'Invalid phone number.'
          }
          error={!validatePhone(signupStateValues.phone)}
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
        <SignupNavigationButton nextStep={handleNext} />
        <br/>
        <Typography variant="caption">
        <Link to="/login">OR RETURN TO LOGIN</Link>
      </Typography>
      </FormControl>
    </Paper>
  );
};

export default InitialSignup;
