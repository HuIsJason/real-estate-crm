import React from 'react';
import Props from './types';

import { makeStyles, Theme } from '@material-ui/core';

const DashboardButton: React.FC<Props> = ({ title }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3 className={classes.text}>{title}</h3>
    </div>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
    background: '#E7EFFF',
    borderRadius: 20,
    boxShadow: '2px 4px 10px 5px rgba(247, 249, 253, 0.63)',
    padding: '30px 50px',
    display: 'inline-block',
  },
  text: {
    color: '#0C3A77',
    fontSize: '24px'
  }
}));

export default DashboardButton;
