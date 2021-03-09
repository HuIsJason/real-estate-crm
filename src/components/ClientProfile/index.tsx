import React, {useState, useCallback, ChangeEvent, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

import { ClientProfileProps } from './types';


const ClientProfile: React.FC<ClientProfileProps> = ({page}: ClientProfileProps) => {
  const classes = useStyles();
  const [phone, setPhone] = useState<string>("416-666-8888");
  const [email, setEmail] = useState<string>("joeySmith@outlook.com");
  const [address, setAddress] = useState<string>("123 joey land drive");
  const [open, setOpen] = useState(false);

  const render = page == "profile";

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
    const phone = phoneRef.current as any;
    const email = emailRef.current as any;
    const address = addressRef.current as any;

    setPhone(phone.value);
    setEmail(email.value);
    setAddress(address.value);
    setOpen(false);
  },[setPhone, setEmail, setAddress, setOpen]);

  return (
    <>
    { render && <div className={classes.profileInfoContainer}>
      <Avatar alt="Joey" src="/static/images/avatar/1.jpg" className={classes.large} />
      <div className={classes.contactContainer}>
          <Typography color="primary" className={classes.header + " " + classes.contactInfo}>
            Contact information
          </Typography>

          
            <Typography className={classes.contactInfo}>
              <strong>Phone: </strong>{phone}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Email: </strong> {email}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Linked Account:</strong> NOT LINKED <Button variant="contained" color="primary" className={classes.linkButton}> INVITE</Button>
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Address: </strong>{address}
            </Typography>
      </div>
        <Button variant="contained" color="primary" className={classes.editButton} onClick={handleClickOpen}> EDIT </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Contact Information</DialogTitle>
                    <DialogContent>

                    <TextField
                        autoFocus
                        defaultValue={phone}
                        inputRef={phoneRef}
                        margin="dense"
                        id="phone1"
                        label="Phone 1"
                        type="phone"
                        fullWidth
                    />

                    <TextField
                        defaultValue={email}
                        inputRef={emailRef}
                        margin="dense"
                        id="email"
                        label="Email"
                        type="Email"
                        fullWidth
                    />

                    <TextField
                        defaultValue={address}
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

export default ClientProfile;