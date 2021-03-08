import React from 'react';
import ModalProps from './types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';

const ConfirmationModal: React.FC<ModalProps> = ({ open, onCancel, onContinue, actionDescription }: ModalProps) => {
    const classes = useStyles();

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Confirmation</h2>
            <p id="simple-modal-description">
                Are you sure you want to {actionDescription}?
            </p>
            <button type="button" onClick={onCancel}><Typography variant='button'> Cancel </Typography> </button>
            <button type="button" onClick={onContinue} style={{ marginLeft: 10 }}><Typography variant='button' > Continue </Typography> </button>
        </div>

    );
    
    return (

        <Modal
            open={open}
            onClose={onCancel}
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

export default ConfirmationModal;