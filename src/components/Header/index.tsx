import React from 'react';
import Props from './types';

import useStyles from './styles';

const Header: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  return (
    <>
      <h1 className={classes.root}>{title}</h1>
    </>
  );
};

export default Header;
