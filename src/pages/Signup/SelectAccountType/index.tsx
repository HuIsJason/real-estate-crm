import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';

import Props from './types';
import useStyles from '../styles';

const SelectAccountType: React.FC<Props> = ({
  handleAccountTypeChange,
  prevStep,
  nextStep,
}: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography color="primary" variant="h3">
        Are you a...?
      </Typography>
      <Button onClick={handleAccountTypeChange} />
      <Button onClick={prevStep}>Back</Button>
      <Button onClick={nextStep}>Next</Button>
    </Paper>
  );
};

export default SelectAccountType;
