import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';

import Props from './types';
import useStyles from './styles';
import useSignupStyles from '../styles';
import { SignupNavigationButton } from '../../../components';

const SelectAccountType: React.FC<Props> = ({
  handleAccountTypeChange,
  prevStep,
  nextStep,
}: Props) => {
  const classes = useStyles();
  const signupClasses = useSignupStyles();

  return (
    <Paper className={signupClasses.paper} elevation={5}>
      <Typography className={signupClasses.title} color="primary" variant="h3">
        Are you a(n)...?
      </Typography>
      <Typography variant="body1">Please select an account type.</Typography>
      <Button
        className={classes.button}
        onClick={() => handleAccountTypeChange(true)}
      >
        Agent
      </Button>
      <Button
        className={classes.button}
        onClick={() => handleAccountTypeChange(false)}
      >
        Client
      </Button>
      <div>
        <SignupNavigationButton isBack {...{ prevStep, nextStep }} />
      </div>
    </Paper>
  );
};

export default SelectAccountType;
