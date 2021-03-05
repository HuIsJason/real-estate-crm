import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { ClientAccount } from '../AccountListTable/types';
import AccountDetailProps from './types';
import ResetPasswordModal from '../ResetPasswordModal/index';
import generateRandomPassword from './generatePassword';


const clientAccounts : ClientAccount[] = [
    { 
        email: "jenny@hotmail.com", 
        firstName: "Jenny",
        lastName: "White",
        phone: "416-987-7555", 
        type: 'client'
    },
]

const AccountDetails: React.FC<AccountDetailProps> = ({ hideDetails, deleteAccount, accountEmail}: AccountDetailProps) => {

    const classes = useStyles();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');

    const handleDeleteAccount = () => {
        deleteAccount(accountEmail); 
    }

    const resetPassword = () => {
        setNewPassword(generateRandomPassword());
        setModalOpen(true);
    }

    const account = clientAccounts.filter(account => account.email === accountEmail)[0];

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
            <br/>
            Actions:
            <button onClick={handleDeleteAccount}> Delete Account </button>
            <button onClick={resetPassword}> Reset Password </button>
            <ResetPasswordModal open={modalOpen} onClose={() => setModalOpen(false)} newPassword={newPassword}/>
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