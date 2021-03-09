import React, {useState, useCallback, ChangeEvent, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

import { ClientProfileProps } from './types';


const ClientProfile: React.FC<ClientProfileProps> = ({page}: ClientProfileProps) => {
  const classes = useStyles();
  const [phoneOne, setPhoneOne] = useState<string>("416-666-8888");
  const [phoneTwo, setPhoneTwo] = useState<string>("657-123-3210");
  const [email, setEmail] = useState<string>("joeySmith@outlook.com");
  const [address, setAddress] = useState<string>("123 joey land drive");
  const [open, setOpen] = useState(false);

  const render = page == "profile";

  const phoneOneRef = useRef();
  const phoneTwoRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  const handleClickOpen = useCallback(() => {
      setOpen(true);
  },[]);
  
  const handleClose = useCallback(() => {
      setOpen(false);
  },[]);

  const handleEdit = useCallback(() => {
    const phone1 = phoneOneRef.current as any;
    const phone2 = phoneTwoRef.current as any;
    const email = emailRef.current as any;
    const address = addressRef.current as any;

    setPhoneOne(phone1.value);
    setPhoneTwo(phone2.value);
    setEmail(email.value);
    setAddress(address.value);
    setOpen(false);
  },[setPhoneOne, setPhoneTwo, setEmail, setAddress, setOpen]);

  return (
    <>
    { render && <div className={classes.profileInfoContainer}>
      <Avatar alt="Joey" src="/static/images/avatar/1.jpg" className={classes.large} />
      <div className={classes.contactContainer}>
          <Typography color="primary" className={classes.header + " " + classes.contactInfo}>
            Contact information
          </Typography>

          
            <Typography className={classes.contactInfo}>
              Phone 1: {phoneOne}
            </Typography>

            <Typography className={classes.contactInfo}>
              Phone 2: {phoneTwo}
            </Typography>

            <Typography className={classes.contactInfo}>
              Email: {email}
            </Typography>

            <Typography className={classes.contactInfo}>
              Linked Account: NOT LINKED <Button variant="contained" color="primary" className={classes.linkButton}> LINK ACCOUNT </Button>
            </Typography>

            <Typography className={classes.contactInfo}>
              Address: {address}
            </Typography>
      </div>
        <Button variant="contained" color="primary" className={classes.editButton} onClick={handleClickOpen}> EDIT </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Contact Information</DialogTitle>
                    <DialogContent>

                    <TextField
                        autoFocus
                        defaultValue={phoneOne}
                        inputRef={phoneOneRef}
                        margin="dense"
                        id="phone1"
                        label="Phone 1"
                        type="phone"
                        fullWidth
                    />

                    <TextField
                        defaultValue={phoneTwo}
                        inputRef={phoneTwoRef}
                        margin="dense"
                        id="phone2"
                        label="Phone 2"
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