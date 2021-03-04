import React from 'react';
import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import Props from './types';
import useStyles from '../styles';

const InitialSignup: React.FC<Props> = ({
  signupState,
  handleFormChange,
  nextStep,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper} elevation={5}>
        <Typography color="primary" variant="h3">
          Signup
        </Typography>
        <FormControl
          onSubmit={nextStep}
          component="form"
          fullWidth
          variant="filled"
        >
          <TextField
            className={classes.textField}
            value={signupState.firstName}
            onChange={(e) => handleFormChange(e, 'firstName')}
            fullWidth
            label="First name"
            required
          />
          <TextField
            className={classes.textField}
            value={signupState.lastName}
            onChange={(e) => handleFormChange(e, 'lastName')}
            fullWidth
            label="Last name"
            required
          />
          <TextField
            className={classes.textField}
            value={signupState.email}
            onChange={(e) => handleFormChange(e, 'email')}
            type="email"
            fullWidth
            label="Email"
            required
          />
          <TextField
            className={classes.textField}
            value={signupState.password}
            onChange={(e) => handleFormChange(e, 'password')}
            type="password"
            fullWidth
            label="Password"
            required
          />
        </FormControl>
        <Button className={classes.button} onClick={nextStep}>
          Next
        </Button>
      </Paper>
    </>
  );
};

export default InitialSignup;
