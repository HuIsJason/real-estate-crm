import React from 'react';

import { HeaderProps as Props } from './types';
import useStyles from './styles';
import { useUserContext } from '../../contexts/UserContext';

const Header: React.FC<Props> = ({ title }: Props) => {
  const { user, loginUser, logoutUser } = useUserContext();

  const classes = useStyles();

  return (
    <>
      <h1 className={classes.root}>{title}</h1>
      {user ? (
        <h2>
          The current user is: {user.id}, {user.name}, {user.bio}, {user.phone}
        </h2>
      ) : (
        <h2>not currently logged in</h2>
      )}
      <button onClick={user ? logoutUser : loginUser}>
        {user ? 'Log out' : 'Log in'}
      </button>
    </>
  );
};

export default Header;
