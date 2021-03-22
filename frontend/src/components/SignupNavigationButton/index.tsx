import React from 'react';
import { Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Props from './types';
import useStyles from './styles';

const SignupNavigationButton: React.FC<Props> = ({
  isBack = false,
  prevStep,
  nextStep,
}: Props) => {
  const classes = useStyles();

  return isBack ? (
    <Button className={classes.button} onClick={prevStep}>
      <ArrowBackIosIcon />
    </Button>
  ) : (
    <Button className={classes.button} onClick={nextStep}>
      <ArrowForwardIosIcon />
    </Button>
  );
};

export default SignupNavigationButton;
