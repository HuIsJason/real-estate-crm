import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import useSignupStyles from '../styles';

const Confirmation: React.FC = () => {
  const classes = useStyles();
  const signupClasses = useSignupStyles();

  return (
    <Paper className={`${signupClasses.paper} ${classes.paper}`} elevation={5}>
      <Typography className={signupClasses.title} color="primary" variant="h3">
        Request received!
      </Typography>
      <Typography variant="h6">
        Thank you for signing up for an Agent account. We havbe received your
        submission and are in the process of verifying your license. This
        process may take 3-5 business days. You will receive an email once your
        account has been activated.
      </Typography>
      <br />
      <Typography variant="h6">
        If you have any questions, please contact our customer support service
        at 1-800-556-7788.
      </Typography>
      <Typography className={classes.returnLink} variant="body1">
        <Link to="/login">Return to Login</Link>
      </Typography>
    </Paper>
  );
};

export default Confirmation;
