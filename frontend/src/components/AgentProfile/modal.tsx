import React from 'react';
import ChangePasswordModalProps from './types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';

import send from '../../requests/request';

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ username, open, onClose }: ChangePasswordModalProps) => {
    const classes = useStyles();
    const [password, setPassword] = React.useState('');
    const [confirmedPassword, setConfirmedPassword] = React.useState('');
    const [warning, setWarning] = React.useState(false);

    const resetValues = () => {
      setPassword('');
      setConfirmedPassword('');
      return;
    }

    const onCancel = () => {
      resetValues(); 
      onClose();
    }

    const savePassword = () => {
      if (password.length < 4) {
        setWarning(true);
        return;
      }
      if (password !== confirmedPassword) {
        alert('Passwords do not match.');
        return
      }
      
      const reqBody = [ {op: "set", field: "password", value: password} ]
      send('modifyAgent', reqBody, `/${username}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Password succesfully updated");
          resetValues();
          onClose();
        } else {
          throw `Could not update password... Error ${res.status}`
        }
      })
      .catch(error => {
        console.log(error);
        alert("Sorry, we could not update the password, please try again later.");
        return;
      });

    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWarning(false);
      setPassword(event.target.value);
    }

    const handleChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmedPassword(event.target.value);
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Change Password</h2>
            <div style={{height: '20px'}}>
              { <Typography style={ warning ? {color: 'red'} : {}} variant="caption">
                  Please enter a new password. Length should be 4 or more characters.
              </Typography>
              }
            </div>
            <div style={{marginBottom: 30, marginTop: 10}}>
              <input className={classes.inputField} type='password' placeholder="New Password" value={password} onChange={handleChangePassword} />
            </div> 
            <div style={{height: '20px'}}>
              {<Typography variant="caption">
                  Please re-enter the new password. 
              </Typography>
              }
            </div>
            <div style={{marginBottom: 30, marginTop: 10}}>
              <input className={classes.inputField} type='password' placeholder="Confirm Password" value={confirmedPassword} onChange={handleChangeConfirm} />
            </div> 
            <button type="button" onClick={onCancel}><Typography variant='button'> Cancel </Typography> </button>
            <button type="button" onClick={savePassword} style={{ marginLeft: 10 }}><Typography variant='button' > Confirm Change </Typography> </button>
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
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '25%',
      left: '25%',
    },
    inputField: {
      margin: 0,
      borderRadius: 5,
      borderColor: "#F1F2F5",
      padding: '10px 12px',
      display: 'inline-block',
      width: '300px',
      fontWeight: 500,
      fontSize: '12px',
      border: '1px solid grey', 
      '&:focus': {
        outline: 'none',
      }
    }
  }),
);

export default ChangePasswordModal;