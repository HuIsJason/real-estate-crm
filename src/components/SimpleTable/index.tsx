import React from 'react';
import Props from './types';
import { uid } from 'react-uid';

import TableRow from './tablerow';
import { makeStyles, Table, Theme } from '@material-ui/core';

const SimpleTable: React.FC<Props> = ({ requests, selectRequest }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>
              Request Number
            </th>
            <th>
              Account Email
            </th>
            <th>
              Date of Request
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <TableRow 
              key={request.requestId} 
              requestId={request.requestId}
              email={request.accountEmail} 
              dateOfRequest={request.dateOfRequest} 
              onClick={() => selectRequest(request.requestId)}/> ))}
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