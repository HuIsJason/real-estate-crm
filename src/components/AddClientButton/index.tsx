import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

import AddClientButtonProps from './types';

import { createData } from '../ClientList/data';

import useStyles from './styles';

const AddClientButton: React.FC<AddClientButtonProps> = ({rows, setRows}: AddClientButtonProps)=> {
    const [open, setOpen] = React.useState(false);
    const [nameField, setNameField] = React.useState("");
    const [emailField, setEmailField] = React.useState("");
    const [tagField, setTagField] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleClientAdditon = () => {
        const newRows = rows;
        newRows.push(createData(nameField, emailField, tagField))
        setRows(newRows);
    };
    
    const handleNameChange = () => {
        setNameField(nameField);
    }
  
    const classes = useStyles();

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen} classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.addButton}>
                + Add Client
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Client</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To enter a new client to your list, please input their required information
                        </DialogContentText>

                    <TextField
                        onChange={handleNameChange}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />

                    <TextField
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
    }

export default AddClientButton;
