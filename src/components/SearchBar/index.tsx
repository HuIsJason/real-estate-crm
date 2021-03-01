import React from 'react';
import Props from './types';

import { makeStyles, Theme } from '@material-ui/core';

const SearchBar: React.FC<Props> = ({ placeholder }: Props) => {
  const classes = useStyles();
  return (
    <input className={classes.root} placeholder={placeholder || 'Search'}/>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
    background: '#F1F2F5',
    borderRadius: 10,
    padding: '12px 15px',
    display: 'inline-block',
    width: '300px',
    color: '#A2AEB8',
    fontWeight: 500,
    fontSize: '11px',
    border: 'none'
  },
  text: {
    color: '#98A0A7, 100%',
    fontWeight: 500,
    fontSize: '11px',
  }
}));

export default SearchBar;