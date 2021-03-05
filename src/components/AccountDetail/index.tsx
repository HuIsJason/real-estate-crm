import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import AccountDetailProps from './types'


const AccountDetails: React.FC<AccountDetailProps> = ({ hideDetails, deleteAccount, account }: AccountDetailProps) => {

    const classes = useStyles();

    const handleDeleteAccount = () => {
        deleteAccount(account.email); 
    }

    const resetPassword = () => {

    }

    return (
        <div className={classes.root}>
            <button onClick={() => hideDetails()}> Go Back </button>
            <h2> Review Account Details</h2>
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
            Actions:
            <button onClick={handleDeleteAccount}> Delete Account </button>
            <button onClick={resetPassword}> Reset Password </button>
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

export default AccountDetails;