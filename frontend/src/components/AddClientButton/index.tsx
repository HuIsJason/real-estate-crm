import React, { ChangeEvent, useCallback, useState } from 'react';
import { addClient } from '../../actions/clients';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import AddClientButtonProps from './types';
import useStyles from './styles';

import { useUserContext } from '../../contexts/UserContext';

const AddClientButton: React.FC<AddClientButtonProps> = ({
  rows,
  setRows,
}: AddClientButtonProps) => {
  const [open, setOpen] = useState(false);
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [tagField, setTagField] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const { user } = useUserContext();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClientAdditon = useCallback(() => {
    setEmailValid(/\S+@\S+\.\S+/.test(emailField));

    if (/\S+@\S+\.\S+/.test(emailField)) {
      addClient(nameField, emailField, tagField, rows, setRows, user);
      setOpen(false);
    }
  }, [nameField, emailField, tagField, setRows, setOpen, rows, user]);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: 'name' | 'email' | 'tags'
    ) => {
      switch (type) {
        case 'name':
          setNameField(e.currentTarget.value);
          break;
        case 'email':
          setEmailField(e.currentTarget.value);
          break;
        case 'tags':
          setTagField(e.currentTarget.value);
          break;
      }
    },
    []
  );

  const classes = useStyles();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        classes={{ root: classes.listButtonsHead }}
        className={classes.listButtons + ' ' + classes.addButton}
      >
        + Add Client
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To enter a new client to your list, please input their required
            information
          </DialogContentText>

          <TextField
            onChange={(e) => handleChange(e, 'name')}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
          />

          <TextField
            onChange={(e) => handleChange(e, 'email')}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            {...(emailValid ? { error: false } : { error: true })}
          />

          <TextField
            onChange={(e) => handleChange(e, 'tags')}
            margin="dense"
            id="name"
            label="Tags"
            type="tag"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClientAdditon} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddClientButton;
