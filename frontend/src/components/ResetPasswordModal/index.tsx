import React from 'react';
import ModalProps from './types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';

const ResetPasswordModal: React.FC<ModalProps> = ({ open, onClose, newPassword }: ModalProps) => {
    const classes = useStyles();

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Password Reset</h2>
            <p id="simple-modal-description">
                Here is a temporary password that the user can login with: 
                <br/><br/>
                {newPassword}
            </p>
            <button type="button" onClick={onClose}><Typography variant='button'>close</Typography></button>
        </div>

    );
    
    return (

        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {body}
        </Modal>

    )


}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '25%',
      left: '25%',
    },
  }),
);

export default ResetPasswordModal;