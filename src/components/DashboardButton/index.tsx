import React from 'react';
import Props from './types';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const DashboardButton: React.FC<Props> = ({ title, link }: Props) => {
  const classes = useStyles();
  return (
    <Link to={link}>
      <button className={classes.button}>
        <h3 className={classes.text}>{title}</h3>
      </button>
    </Link>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(2),
    background: '#E7EFFF',
    borderRadius: 20,
    boxShadow: '2px 4px 10px 5px rgba(247, 249, 253, 0.63)',
    padding: '30px 50px',
    display: 'inline-block',
    border: 'none',
    outline: 'none', 
    '&:hover' : {
      opacity: .7,

    }
  },
  text: {
    color: '#0C3A77',
    fontSize: '24px',
  }
}));

export default DashboardButton;
