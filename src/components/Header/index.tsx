import React from 'react';
import { Button, Typography } from '@material-ui/core';

import { HeaderProps as Props } from './types';
import useStyles from './styles';
import { useUserContext } from '../../contexts/UserContext';

/*
 * SINCE WE DONT HAVE A REAL HEADER COMPONENT FOR NOW, THIS WILL BE A SAMPLE COMPONENT FOR TESTING.
 * YOU CAN SEE HOW THE UserContext IS CONSUMED, AS WELL AS HOW TO USE THE GLOBAL THEME BY
 * PASSING THE PROP color="primary" IF YOU WANT AN ELEMENT TO HAVE THE NAVY BLUE.
 */
const Header: React.FC<Props> = ({ title }: Props) => {
  const { user, logoutUser } = useUserContext();

  const classes = useStyles();

  return (
    <>
      <h1 className={classes.root}>{title}</h1>
      {user ? (
        <Typography variant="h4" color="primary">
          The current user is: {user.id}, {user.name}, {user.bio}, {user.phone}
        </Typography>
      ) : (
        <Typography variant="h4">not currently logged in</Typography>
      )}
      {user && (
        <Button variant="contained" color="primary" onClick={logoutUser}>
          {' '}
          {user ? 'Log out' : 'Log in'}
        </Button>
      )}
    </>
  );
};

export default Header;
