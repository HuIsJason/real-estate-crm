import React from 'react';
import { Button } from '@material-ui/core';

import { HeaderProps as Props } from './types';
import useStyles from './styles';
import { useUserContext } from '../../contexts/UserContext';

const Header: React.FC<Props> = ({ title }: Props) => {
  const { user, logoutUser } = useUserContext();

  const classes = useStyles();

  return (
    <>
      <h1 className={classes.root}>{title}</h1>
      <h2>{user?.loggedInAs}</h2>
      <Button onClick={logoutUser}>Logout</Button>
    </>
  );
};

export default Header;
