import React, {useState, useCallback, useRef, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';

import {getClient, editClient} from '../../actions/client';

import useStyles from './styles';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

import { ClientProfileProps, clientType } from './types';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

const ClientProfile: React.FC<any> = ({page, setClient, client, clientId}:any) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const render = page === "profile";

  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();


  const handleClickOpen = useCallback(() => {
      setOpen(true);
  },[]);
  
  const handleClose = useCallback(() => {
      setOpen(false);
  },[]);

  const handleEdit = useCallback(() => {
    // This callback would contain an API call to edit client profile info in the backend
    const phone = phoneRef.current as any;
    const email = emailRef.current as any;
    const address = addressRef.current as any;
    
    editClient(clientId, {
      name: client.name,
      phone: phone.value,
      email: email.value,
      address: address.value
    }, setClient);

    setOpen(false);
  },[editClient, setOpen, client, setClient]);

  return (
    <>
    { render && <div className={classes.profileInfoContainer}>
      <Avatar alt="Joey" src="/static/images/avatar/1.jpg" className={classes.large} />
      <div className={classes.contactContainer}>
          <Typography color="primary" className={classes.header + " " + classes.contactInfo}>
            Contact information
          </Typography>

          
            <Typography className={classes.contactInfo}>
              <strong>Phone: </strong>{client.phone}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Email: </strong> {client.email}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Linked Account:</strong> NOT LINKED 
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Address: </strong>{client.address}
            </Typography>
      </div>
        <Button variant="contained" color="primary" className={classes.editButton} onClick={handleClickOpen}> EDIT </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Contact Information</DialogTitle>
                    <DialogContent>

                    <TextField
                        autoFocus
                        defaultValue={client.phone}
                        inputRef={phoneRef}
                        margin="dense"
                        id="phone1"
                        label="Phone 1"
                        type="phone"
                        fullWidth
                    />

                    <TextField
                        defaultValue={client.email}
                        inputRef={emailRef}
                        margin="dense"
                        id="email"
                        label="Email"
                        type="Email"
                        fullWidth
                    />

                    <TextField
                        defaultValue={client.address}
                        inputRef={addressRef}
                        margin="dense"
                        id="Address"
                        label="Address"
                        type="Address"
                        fullWidth
                    />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleEdit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
            </Dialog>
    </div>
    }
    </>
  );
}

export default withRouter(ClientProfile);