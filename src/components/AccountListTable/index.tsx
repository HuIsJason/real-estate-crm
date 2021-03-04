import React from 'react';
import Props from './types';
import { uid } from 'react-uid';

import TableRow from './tablerow';
import { makeStyles, Theme } from '@material-ui/core';

const SimpleTable: React.FC<Props> = ({ accountSummaries, onSelectRow }: Props) => {
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
          {accountSummaries.map(account => (
            <TableRow 
              key={account.accountEmail} 
              email={account.accountEmail} 
              lastLogin={account.lastLogin} 
              onClick={() => onSelectRow(account.accountEmail)}/> ))}
        </tbody>

      </table>
    </div>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
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
  }
}));

export default SimpleTable;