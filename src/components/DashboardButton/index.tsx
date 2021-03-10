import React from 'react';
import Props from './types';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';


const DashboardButton: React.FC<Props> = ({ title, link }: Props) => {
  const classes = useStyles();
  return (
    <Link to={link}>
      <button className={classes.button}>
        <Typography variant="button">{title}</Typography>
      </button>
    </Link>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(2),
    background: "white",
    color: "#0C3A77",
    boxShadow: '1px 4px 2px rgba(229, 229, 229, 0.5)',
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
