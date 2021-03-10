import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { ClientAccount } from '../AccountListTable/types';
import AccountDetailProps from './types';
import ResetPasswordModal from '../ResetPasswordModal/index';
import generateRandomPassword from './generatePassword';
import ConfirmationModal from '../ConfirmationModal';


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
    const [modalOpen, setModalOpen] = React.useState(0);
    const [newPassword, setNewPassword] = React.useState('');

    const handleDeleteAccount = () => {
        // TODO: Send server request to delete account email <accountEmail>
        deleteAccount(accountEmail); 
        setModalOpen(0);
    }

    const resetPassword = () => {
        const newPassword = generateRandomPassword();
        setNewPassword(newPassword);
        // TODO: Send server request to set the password of the account with email <accountEmail> with <newPassword>
        setModalOpen(1);
    }

    // TODO: Get the account object with email <accountEmail> from the server
    const account = clientAccounts.filter(account => account.email === accountEmail)[0];

    return (
        <div className={classes.root}>
            <button className={classes.button} onClick={() => hideDetails()}> <Typography variant='button'> Return </Typography> </button>
            <Typography variant='h6'> Review Account Details</Typography>
            <div>
                <Typography variant="body2"> <span className={classes.bold}>Email:</span> {account.email} </Typography>
            </div>
            <div>
                <Typography variant="body2"> <span className={classes.bold}> Name:</span> {account.lastName}, {account.firstName} </Typography>
            </div>
            <div>
                <Typography variant="body2"> <span className={classes.bold}>Phone Number:</span> {account.phone} </Typography>
            </div>
            <br/>
            <span> <Typography variant='overline'> Actions: </Typography> </span>
            <button className={classes.button} onClick={() => setModalOpen(2)}> <Typography variant='button'> Delete Account </Typography></button>
            <button className={classes.buttonFilled} onClick={() => setModalOpen(3)}> <Typography variant='button'> Reset Password </Typography> </button>
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