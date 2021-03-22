import React from 'react';
import Props from './types';

import TableRow from './tablerow';
import { makeStyles, Theme, Typography } from '@material-ui/core';

const entriesPerPage = 10;

const ProjectList: React.FC<Props> = ({ accountSummaries, onSelectRow, displayPage, onClickNext, onClickPrev }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>
              Account Email
            </th>
            <th>
              Date of Last Login
            </th>
          </tr>
        </thead>
        <tbody>
          { accountSummaries.slice((displayPage - 1) * entriesPerPage, displayPage * entriesPerPage).map(account => (
            <TableRow 
              key={account.accountEmail} 
              email={account.accountEmail} 
              lastLogin={account.lastLogin} 
              onClick={() => onSelectRow(account.accountEmail)}/> ))}
        </tbody>
      </table>
      <br/>
      <span style={{ float: 'right', marginRight: 10}}> <Typography variant='caption'> Displaying {accountSummaries.length / entriesPerPage < displayPage ? accountSummaries.length % entriesPerPage : entriesPerPage} of {accountSummaries.length} entries. </Typography> </span> 
      <div className={classes.buttonContainer}>
        { displayPage === 1 ? null : (<button className={classes.button} onClick={onClickPrev}> Previous </button>) }
        { displayPage === Math.ceil(accountSummaries.length / entriesPerPage) || accountSummaries.length === 0 ? null : (<button className={classes.button} onClick={onClickNext}> Next </button>)} 
      </div>
    </div>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    background: 'white',
    border: '2px solid #F1F2F5',
    padding: '10px 10px'
  },
  table: {
    borderCollapse: 'collapse', 
    width: '100%',
    '& td, th': {
      border: '1px solid #F1F2F5',
      padding: '0.5rem',
      textAlign: 'left',
    },
    '& tbody tr': {
      '&:hover' : {
        backgroundColor: '#F1F2F5',
        opacity: .7,
      }
    }
  },
  text: {
    color: '#98A0A7, 100%',
    fontWeight: 500,
    fontSize: '11px',
  },
  button: {
    background: "white",
    color: "#0C3A77",
    padding: '8px 10px',
    border: '1px solid #F1F2F5',
    borderRadius: '5%',
    outline: 'none',
    '&:hover' : {
      opacity: .7,
    }
  },
  buttonContainer: {
    marginBottom: 0,
    minHeight: '35px'
  },
}));

export default ProjectList;