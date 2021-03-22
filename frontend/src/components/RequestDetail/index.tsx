import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import RequestDetailProps from './types';
import ConfirmationModal from '../ConfirmationModal/index';



const RequestDetails: React.FC<RequestDetailProps> = ({ hideDetails, deleteRequest, account, requestId }: RequestDetailProps) => {

    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(0);

    const handleDenyRequest = () => {
        setOpenModal(0);
        deleteRequest(requestId); 
        // TODO: Send request to server to delete the account <account> 
    }

    const activateAccount = () => {
        setOpenModal(0);
        deleteRequest(requestId);
        // TODO: Send request to server to update the account <account> to be activated
    }

    return (
        <div className={classes.root}>
            {account !== null ? 
            (<div>
            <button className={classes.button} onClick={() => hideDetails()}> <Typography variant='button'> Return </Typography> </button>
            <Typography variant='h6'> Review Account Details for Request {requestId}</Typography>
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
            <button className={classes.button} onClick={() => setOpenModal(1)}> <Typography variant='button'> Deny Request </Typography> </button>
            <button className={classes.buttonFilled} onClick={() => setOpenModal(2)}> <Typography variant='button'> Activate Account </Typography></button>
            <ConfirmationModal open={openModal === 1} onCancel={() => setOpenModal(0)} onContinue={handleDenyRequest} actionDescription="deny this request"/>
            <ConfirmationModal open={openModal === 2} onCancel={() => setOpenModal(0)} onContinue={activateAccount} actionDescription="activate this account"/>
            </div>) : null }
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

export default RequestDetails;