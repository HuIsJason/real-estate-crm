import React, { useState, useCallback, useRef, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';

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

  const { user } = useUserContext();

  const [agent, setAgent] = useState<any>({
    name: 'Not available',
    bio: 'Not available',
    history: 0,
    company: 'Not available',
    city: 'Not available',
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
  const cityRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const specRef = useRef();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleEdit = useCallback(() => {
    const name = nameRef.current as any;
    const bio = bioRef.current as any;
    const history = historyRef.current as any;
    const company = companyRef.current as any;
    const city = cityRef.current as any;
    const phone = phoneRef.current as any;
    const email = emailRef.current as any;
    // const spec = specRef.current as any;

    editAgent(
      user,
      {
        name: name.value,
        email: email.value,
        phone: phone.value,
        bio: bio.value,
        company: company.value,
        history: history.value,
        city: city.value,
        specialization: spec,
      },
      setAgent,
      spec,
      setSpec
    );

    setOpen(false);
  }, [setAgent, setOpen, user, spec]);

  const handleSpecChange = useCallback((e) => {
    setSpec(e.target.value);

  }, []);

  return (
    <div className={classes.profileInfoContainer}>
      {/* <Avatar alt="Julia" src="/static/images/avatar/1.jpg" className={classes.large} /> */}
      <div className={classes.contactContainer}>
        <Typography
          color="primary"
          className={classes.header + ' ' + classes.contactInfo}
        >
          Profile Information
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Name: </strong>
          {agent.name}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Bio: </strong>
          {agent.bio}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Realtor Since: </strong>
          {agent.history}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>Company: </strong>
          {agent.company}
        </Typography>

        <Typography className={classes.contactInfo}>
          <strong>City: </strong>
          {agent.city}
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
            defaultValue={agent.name}
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
            defaultValue={agent.history}
            inputRef={historyRef}
            margin="dense"
            id="History"
            label="Realtor Since"
            type="number"
            fullWidth
          />

          <TextField
            defaultValue={agent.company}
            inputRef={companyRef}
            margin="dense"
            id="Address"
            label="Company"
            type="Address"
            fullWidth
          />

          <TextField
            defaultValue={agent.city}
            inputRef={cityRef}
            margin="dense"
            id="City"
            label="City"
            type="City"
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
          />

          <TextField
            defaultValue={agent.email}
            inputRef={emailRef}
            margin="dense"
            id="Email"
            label="Email"
            type="Email"
            fullWidth
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
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AgentProfile;
