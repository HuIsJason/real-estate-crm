import React, {useState, useCallback, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';


const AgentProfile: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = useState<string>("Julia Smith");
  const [bio, setBio] = useState<string>("Getting you top $$$");
  const [history, setHistory] = useState<string>("2010");
  const [company, setCompany] = useState<string>("HomeLife");
  const [city, setCity] = useState<string>("Toronto");
  const [phone, setPhone] = useState<string>("647-626-8888");
  const [email, setEmail] = useState<string>("joeySmith@outlook.com");
  const [specialization, setSpecialization] = useState<string>("Buyer Agent");
  const [open, setOpen] = useState(false);

  const nameRef = useRef();
  const bioRef = useRef();
  const historyRef = useRef();
  const companyRef = useRef();
  const cityRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const specRef = useRef();

  const handleClickOpen = useCallback(() => {
      setOpen(true);
  },[]);
  
  const handleClose = useCallback(() => {
      setOpen(false);
  },[]);

  const handleEdit = useCallback(() => {
    const name = nameRef.current as any;
    const bio = bioRef.current as any;
    const history = historyRef.current as any;
    const company = companyRef.current as any;
    const city = cityRef.current as any;
    const phone = phoneRef.current as any;
    const email = emailRef.current as any;
    const spec = specRef.current as any;

    setName(name.value);
    setBio(bio.value);
    setHistory(history.value);
    setCompany(company.value);
    setCity(city.value);
    setPhone(phone.value);
    setEmail(email.value);
    setSpecialization(spec.value);

    setOpen(false);
  },[setName,setBio,setHistory,setCompany,setCity,setPhone,setEmail,setSpecialization,setOpen]);

  return (
    <div className={classes.profileInfoContainer}>
      <Avatar alt="Julia" src="/static/images/avatar/1.jpg" className={classes.large} />
      <div className={classes.contactContainer}>

          <Typography color="primary" className={classes.header + " " + classes.contactInfo}>
            Profile Information
          </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Name: </strong>{name}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Bio: </strong>{bio}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Realtor Since: </strong>{history}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Company: </strong>{company}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>City: </strong>{city}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Phone: </strong> {phone}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Email:</strong> {email}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Specialization: </strong>{specialization}
            </Typography>

      </div>
        <Button variant="contained" color="primary" className={classes.editButton} onClick={handleClickOpen}> EDIT </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Profile Information</DialogTitle>
                    <DialogContent>

                    <TextField
                        autoFocus
                        defaultValue={name}
                        inputRef={nameRef}
                        margin="dense"
                        id="Name"
                        label="Name"
                        type="Name"
                        fullWidth
                    />

                    <TextField
                        defaultValue={bio}
                        inputRef={bioRef}
                        margin="dense"
                        id="Bio"
                        label="Bio"
                        type="Bio"
                        fullWidth
                    />

                    <TextField
                        defaultValue={history}
                        inputRef={historyRef}
                        margin="dense"
                        id="History"
                        label="Realtor Since"
                        type="History"
                        fullWidth
                    />

                    <TextField
                        defaultValue={company}
                        inputRef={companyRef}
                        margin="dense"
                        id="Address"
                        label="Company"
                        type="Address"
                        fullWidth
                    />

                    <TextField
                        defaultValue={city}
                        inputRef={cityRef}
                        margin="dense"
                        id="City"
                        label="City"
                        type="City"
                        fullWidth
                    />

                    <TextField
                        defaultValue={phone}
                        inputRef={phoneRef}
                        margin="dense"
                        id="Phone"
                        label="Phone"
                        type="Phone"
                        fullWidth
                    />

                    <TextField
                        defaultValue={email}
                        inputRef={emailRef}
                        margin="dense"
                        id="Email"
                        label="Email"
                        type="Email"
                        fullWidth
                    />

                    <TextField
                        defaultValue={specialization}
                        inputRef={specRef}
                        margin="dense"
                        id="Specialization"
                        label="Specialization"
                        type="Specialization"
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
  );
}

export default AgentProfile;