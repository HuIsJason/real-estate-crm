import React from 'react';
import { Button, Typography } from '@material-ui/core';

import { HeaderProps as Props } from './types';
import useStyles from './styles';
import { useUserContext } from '../../contexts/UserContext';
import { Redirect } from 'react-router';

const Header: React.FC<Props> = ({ title }: Props) => {
  const { user, logoutUser } = useUserContext();

  const classes = useStyles();

  return (
    <>
      <h1 className={classes.root}>{title}</h1>
      {user ? (
        user.type !== 'ADMIN' ? (
          <Redirect to='/client-list'></Redirect>
        ) : (
          <Redirect to='/admin'></Redirect>
        )
      ) : (
        <Typography variant="h4">not currently logged in</Typography>
      )}
    </>
  );
};

export default Header;
