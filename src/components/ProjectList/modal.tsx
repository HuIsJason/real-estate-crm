import React from 'react';
import { AddProjectModalProps } from './types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';

const AddProjectModal: React.FC<AddProjectModalProps> = ({ open, onCancel, onContinue }: AddProjectModalProps) => {
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [warning, setWarning] = React.useState(false);

    const saveProject = () => {
      if (name === '') {
        setWarning(true);
        return;
      }
      onContinue(name);
      setName('');
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWarning(false);
      setName(event.target.value);
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Add New Project</h2>
            <div style={{height: '20px'}}>
              { <Typography style={ warning ? {color: 'red'} : {}} variant="caption">
                  Please enter a project name.
              </Typography>
              }
            </div>
            <div style={{marginBottom: 30, marginTop: 10}}>
              <input className={classes.inputField} type='text' placeholder="Project Name" value={name} onChange={handleChange} />
            </div> 
            <button type="button" onClick={onCancel}><Typography variant='button'> Cancel </Typography> </button>
            <button type="button" onClick={saveProject} style={{ marginLeft: 10 }}><Typography variant='button' > Add Project </Typography> </button>
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
    inputField: {
      margin: 0,
      // background: '#F1F2F5',
      borderRadius: 5,
      borderColor: "#F1F2F5",
      padding: '10px 12px',
      display: 'inline-block',
      // outline: '1px solid grey',
      width: '300px',
      color: '#A2AEB8',
      fontWeight: 500,
      fontSize: '12px',
      border: '1px solid grey', 
      '&:focus': {
        outline: 'none',
      }
    }
  }),
);

export default AddProjectModal;