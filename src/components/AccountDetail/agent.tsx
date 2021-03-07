import { makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { AgentAccount } from '../AccountListTable/types';
import AccountDetailProps from './types';
import ResetPasswordModal from '../ResetPasswordModal/index';
import ConfirmationModal from '../ConfirmationModal/index';
import generateRandomPassword from './generatePassword';

const agentAccounts : AgentAccount[] = [

    { email: "joe@gmail.com",
      firstName: "Joe",
      lastName: "Brown",
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
    { email: "harrym@gmail.com",
      firstName: "Harry",
      lastName: "Mills",
      licenseId: "H987654",
      phone: "647-999-8888",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222",
      type: 'agent'
    },
    { email: "georgeli@gmail.com",
      firstName: "George",
      lastName: "Li",
      licenseId: "H5613576",
      phone: "647-777-1234",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222",
      type: 'agent'
    },
    { email: "james@gmail.com",
      firstName: "James",
      lastName: "Li",
      licenseId: "H823910",
      phone: "416-000-0001",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222",
      type: 'agent'
    },
    { email: "miranda@gmail.com",
      firstName: "Mirande",
      lastName: "Redwood",
      licenseId: "H162751",
      phone: "416-882-9829",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222",
      type: 'agent'
    },
    { email: "taylor.white@gmail.com",
      firstName: "Taylor",
      lastName: "White",
      licenseId: "H128926",
      phone: "647-345-678",
      brokerage: "Remax",
      brokerageAddress: "456 Sesame St",
      brokeragePhone: "905-111-2021",
      type: 'agent'
    },
]

const AccountDetails: React.FC<AccountDetailProps> = ({ hideDetails, deleteAccount, accountEmail}: AccountDetailProps) => {

    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(0);
    const [newPassword, setNewPassword] = React.useState('');

    const handleDeleteAccount = () => {
        deleteAccount(accountEmail);
        setModalOpen(0);
    }

    const resetPassword = () => {
        setNewPassword(generateRandomPassword());
        setModalOpen(1);
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
            <button onClick={() => setModalOpen(2)}> Delete Account </button>
            <button onClick={() => setModalOpen(3)}> Reset Password </button>
            <ResetPasswordModal open={modalOpen === 1} onClose={() => setModalOpen(0)} newPassword={newPassword} />
            <ConfirmationModal open={modalOpen === 2} onCancel={() => setModalOpen(0)} onContinue={handleDeleteAccount} actionDescription="delete this account" />
            <ConfirmationModal open={modalOpen === 3} onCancel={() => setModalOpen(0)} onContinue={resetPassword} actionDescription="reset this account's password" />
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