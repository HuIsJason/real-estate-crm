import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import RequestDetailProps from './types'


const RequestDetails: React.FC<RequestDetailProps> = ({ hideDetails, deleteRequest, account, requestId }: RequestDetailProps) => {

    const classes = useStyles();

    const handleDenyRequest = () => {
        deleteRequest(requestId); 
    }

    const activateAccount = () => {
        deleteRequest(requestId);
    }

    return (
        <div className={classes.root}>
            <button onClick={() => hideDetails()}> Go Back </button>
            <h2> Review Account Details for Request {requestId}</h2>
            <div>
                <span className={classes.bold}>Email:</span> {account.email}
            </div>
            <div>
                <span className={classes.bold}> Name:</span> {account.lastName}, {account.firstName}
            </div>
            <div>
                <span className={classes.bold}>Phone Number:</span> {account.phone}
            </div>
            <div>
                <span className={classes.bold}>License Number:</span> {account.licenseId}
            </div>
            <br/>
            Brokerage Information
            <div>
                <span className={classes.bold}>Brokerage Name:</span> {account.brokerage}
            </div>
            <div>
                <span className={classes.bold}>Brokerage Address:</span> {account.brokerageAddress}
            </div>
            <div>
                <span className={classes.bold}>Brokerage Phone:</span> {account.brokeragePhone}
            </div>
            <br/>
            <button onClick={handleDenyRequest}> Deny Request </button>
            <button onClick={activateAccount}> Activate Account </button>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      margin: theme.spacing(2),
      width: '50%',
      border: '1px solid #98A0A7',
      padding: '10px',
    },
    bold: {
      fontWeight: 'bold',
    }
  }));

export default RequestDetails;