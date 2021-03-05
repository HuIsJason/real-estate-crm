import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { AgentAccount } from '../AccountListTable/types';
import AccountDetailProps from './types'

const agentAccounts : AgentAccount[] = [

    { email: "joe@gmail.com",
      firstName: "joe",
      lastName: "brown",
      licenseId: "H123456",
      phone: "647-123-4567",
      brokerage: "Royal LePage",
      brokerageAddress: "123 Sesame St",
      brokeragePhone: "905-798-1000",
      type: 'agent'
    },
    { email: "maryg@gmail.com",
      firstName: "Mary",
      lastName: "Green",
      licenseId: "H898009",
      phone: "905-888-9999",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222",
      type: 'agent'
    },

]

const AccountDetails: React.FC<AccountDetailProps> = ({ hideDetails, deleteAccount, accountEmail}: AccountDetailProps) => {

    const classes = useStyles();

    const handleDeleteAccount = () => {
        deleteAccount(accountEmail); 
    }

    const resetPassword = () => {

    }

    const account = agentAccounts.filter(account => account.email === accountEmail)[0];


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