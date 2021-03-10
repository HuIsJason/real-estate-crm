import { makeStyles, Theme, Typography } from '@material-ui/core';
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
        // TODO: Send server request to delete account email <accountEmail>
        setModalOpen(0);
    }

    const resetPassword = () => {
        const newPassword = generateRandomPassword();
        setNewPassword(newPassword);
        // TODO: Send server request to set the password of the account with email <accountEmail> with <newPassword>
        setModalOpen(1);
    }

    // TODO: Get the account object with email <accountEmail> from the server
    const account = agentAccounts.filter(account => account.email === accountEmail)[0];


    return (
        <div className={classes.root}>
            <button className={classes.button} onClick={() => hideDetails()}> <Typography variant='button'> Return </Typography> </button>
            
            <Typography variant='h6'> Review Account Details</Typography>
            <div>
                <Typography variant="body2"> <span className={classes.bold}>Email:</span> {account.email} </Typography>
            </div>
            <div>
                <Typography variant="body2"><span className={classes.bold}> Name:</span> {account.lastName}, {account.firstName} </Typography>
            </div>
            <div>
                <Typography variant="body2"><span className={classes.bold}>Phone Number:</span> {account.phone}</Typography>
            </div>
            <div>
              <Typography variant="body2"><span className={classes.bold}>License Number:</span> {account.licenseId}</Typography>
            </div>
            <br/>
            <Typography variant='subtitle1'> Brokerage Information </Typography>
            <div>
                <Typography variant="body2"> <span className={classes.bold}>Brokerage Name:</span> {account.brokerage} </Typography>
            </div>
            <div>
                <Typography variant="body2"><span className={classes.bold}>Brokerage Address:</span> {account.brokerageAddress}</Typography>
            </div>
            <div>
                <Typography variant="body2"><span className={classes.bold}>Brokerage Phone:</span> {account.brokeragePhone} </Typography>
            </div>
            <br/>
            <span> <Typography variant='overline'> Actions: </Typography> </span>
            <button className={classes.button} onClick={() => setModalOpen(2)}> <Typography variant='button'> Delete Account </Typography> </button>
            <button className={classes.buttonFilled} onClick={() => setModalOpen(3)}> <Typography variant='button'> Reset Password </Typography> </button>
            <ResetPasswordModal open={modalOpen === 1} onClose={() => setModalOpen(0)} newPassword={newPassword} />
            <ConfirmationModal open={modalOpen === 2} onCancel={() => setModalOpen(0)} onContinue={handleDeleteAccount} actionDescription="delete this account" />
            <ConfirmationModal open={modalOpen === 3} onCancel={() => setModalOpen(0)} onContinue={resetPassword} actionDescription="reset this account's password" />
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      margin: theme.spacing(1),
      width: '50%',
      border: '1px solid #98A0A7',
      padding: '20px 20px',
      background: 'white'
    },
    bold: {
      fontWeight: 'bold',
    },
    button: {
      background: "white",
      color: "#0C3A77",
      padding: '4px 8px',
      border: '1px solid #98A0A7',
      borderRadius: '5%',
      outline: 'none',
      marginBottom: 10,
      '&:hover' : {
        opacity: .7,
      }
    },
    buttonFilled: {
      background: "#0C3A77",
      color: "white",
      padding: '4px 10px',
      border: 'none',
      outline: 'none',
      borderRadius: "4%",
      marginBottom: 10,
      marginLeft: 10,
      '&:hover' : {
        opacity: .7,
      }
    },
  }));

export default AccountDetails;