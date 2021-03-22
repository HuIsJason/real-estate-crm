import React from 'react';
import Props from './types';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles, Theme } from '@material-ui/core';

const SearchBar: React.FC<Props> = ({ placeholder, onChange, value }: Props) => {
  const classes = useStyles();
  return (
    <input className={classes.root} type='text' onChange={onChange} value={value}
    placeholder={placeholder || 'Search'}/>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    borderRadius: 5,
    borderColor: "#F1F2F5",
    padding: '10px 12px',
    display: 'inline-block',
    width: '300px',
    color: '#A2AEB8',
    fontWeight: 500,
    fontSize: '12px',
    border: '1px solid grey', 
    '&:focus': {
      outline: 'none',
    }
  },
}));

export default SearchBar;