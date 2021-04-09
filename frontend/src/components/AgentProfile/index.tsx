import React, { useState, useCallback, useRef, useEffect } from 'react';

import useStyles from './styles';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { editAgent, getAgent } from '../../actions/agent';

import { useUserContext } from '../../contexts/UserContext';
import ChangePasswordModal from './modal';
import Joi from 'joi';

const specializations = [
  {
    value: 'BUYER',
    label: 'BUYER',
  },
  {
    value: 'SELLER',
    label: 'SELLER',
  },
  {
    value: 'BOTH',
    label: 'BOTH',
  }
];

const AgentProfile: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const { user } = useUserContext();

  const [agent, setAgent] = useState<any>({
    username: '',
    name: 'Not available',
    bio: 'Not available',
    history: 0,
    company: 'Not available',
    address: 'Not available',
    phone: 'Not available',
    email: 'Not available'
  });

  const [spec, setSpec] = useState<any>("SELLER")

  useEffect(() => {
    getAgent(user, setAgent);
  }, [user]);

  const nameRef = useRef();
  const bioRef = useRef();
  const historyRef = useRef();
  const companyRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const specRef = useRef();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setPhoneValid(true);
    setEmailValid(true);
  }, [setPhoneValid, setEmailValid]);

  const handleOpenChangePasswordModal = useCallback(() => {
    setOpenChangePassword(true);
  }, []);

  const handleCloseChangePasswordModal = useCallback(() => {
    setOpenChangePassword(false);
  }, []);
  
  const schema = Joi.object().keys({
    email: Joi.string()
      .lowercase()
      .trim()
      .max(100)
      .email({ minDomainSegments: 2 , tlds: { allow: ['com', 'net', 'ca'] } })
      .required(),
    phone: Joi.string()
      .max(10)
      .min(10)
      .required()
  });

  const handleEdit = useCallback(() => {
    const name = nameRef.current as any;
    const bio = bioRef.current as any;
    const history = historyRef.current as any;
    const company = companyRef.current as any;
    const address = addressRef.current as any;
    const phone = phoneRef.current as any;
    const email = emailRef.current as any;
    // const spec = specRef.current as any;

    schema.validateAsync({ email: email.value, phone: phone.value }).then(val => {
      const res = val;
      setPhoneValid(true);
      setEmailValid(true);

      editAgent(
        user,
        {
          name: name.value,
          email: email.value,
          phone: phone.value,
          bio: bio.value,
          company: company.value,
          history: history.value,
          address: address.value,
          specialization: spec,
        },
        setAgent,
        spec,
        setSpec
      );

      setOpen(false);

    }).catch(err => {
      if (err.details[0].path[0] === "phone") {
        setPhoneValid(false);
      }
      if (err.details[0].path[0] === "email") {
        setEmailValid(false);
      }
    })

    // if(phoneValid && emailValid) {
    //   editAgent(
    //     user,
    //     {
    //       name: name.value,
    //       email: email.value,
    //       phone: phone.value,
    //       bio: bio.value,
    //       company: company.value,
    //       history: history.value,
    //       address: address.value,
    //       specialization: spec,
    //     },
    //     setAgent,
    //     spec,
    //     setSpec
    //   );

    //   setOpen(false);
    // }
  }, [setAgent, setOpen, user, spec, phoneValid, emailValid, setPhoneValid, setEmailValid]);

  const handleSpecChange = useCallback((e) => {
    setSpec(e.target.value);

  }, []);

  return (
    <div className={classes.profileInfoContainer}>
      <div className={classes.contactContainer}>
        <Typography
          color="primary"
          className={classes.header + ' ' + classes.contactInfo}
        >
          Profile Information
        </Typography>
        <Typography className={classes.contactInfo}>
          <strong>Username: </strong>
          {agent.username}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Name: </strong>
          {`${agent.firstName} ${agent.lastName}`}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Bio: </strong>
          {agent.bio}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Realtor Since: </strong>
          {agent.yearStarted}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Brokerage Name: </strong>
          {agent.brokerage}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Brokerage Address: </strong>
          {agent.brokerageAddress}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Phone: </strong> {agent.phone}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Email:</strong> {agent.email}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Specialization: </strong>
          {agent.specialization}
        </Typography>
        <br/>
        <Typography
          color="primary"
          className={classes.header + ' ' + classes.contactInfo}
        >
          More Account Actions
        </Typography>
        <Button className={classes.contactInfo}
        variant="contained"
        color="primary"
        onClick={handleOpenChangePasswordModal}
        >
        {' '}
        Change Password {' '}
        </Button>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.editButton}
        onClick={handleClickOpen}
      >
        {' '}
        EDIT{' '}
      </Button>
      {
        openChangePassword && (
        <ChangePasswordModal 
          open={openChangePassword} 
          onClose={handleCloseChangePasswordModal}
          username={agent.username}
        />)
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit Profile Information
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            defaultValue={`${agent.firstName} ${agent.lastName}`}
            inputRef={nameRef}
            margin="dense"
            id="Name"
            label="Name"
            type="Name"
            fullWidth
          />

          <TextField
            defaultValue={agent.bio}
            inputRef={bioRef}
            margin="dense"
            id="Bio"
            label="Bio"
            type="Bio"
            fullWidth
          />

          <TextField
            defaultValue={agent.yearStarted}
            inputRef={historyRef}
            margin="dense"
            id="History"
            label="Realtor Since"
            type="number"
            fullWidth
          />

          <TextField
            defaultValue={agent.brokerage}
            inputRef={companyRef}
            margin="dense"
            id="Address"
            label="Brokerage"
            type="Address"
            fullWidth
          />

          <TextField
            defaultValue={agent.brokerageAddress}
            inputRef={addressRef}
            margin="dense"
            id="address"
            label="Brokerage Address"
            type="address"
            fullWidth
          />

          <TextField
            defaultValue={agent.phone}
            inputRef={phoneRef}
            margin="dense"
            id="Phone"
            label="Phone"
            type="Phone"
            fullWidth
            {...(phoneValid ? { error: false } : { error: true })}
          />

          <TextField
            defaultValue={agent.email}
            inputRef={emailRef}
            margin="dense"
            id="Email"
            label="Email"
            type="Email"
            fullWidth
            {...(emailValid ? { error: false } : { error: true })}
          />

          <TextField
            value={agent.specialization}
            // inputRef={specRef}
            margin="dense"
            id="Specialization"
            label="Specialization"
            type="Specialization"
            fullWidth
            select
            onChange={handleSpecChange}
          >
          {specializations.map((option) => (
            <MenuItem key={option.value} value={option.value ? option.value : ""}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AgentProfile;
