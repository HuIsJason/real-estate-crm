import React from 'react';
import { AddModalProps } from './types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function formatDate(date: Date) {

  const dayString = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString();
  const mthString = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();

  return `${date.getFullYear()}-${mthString}-${dayString}`;

}

const AddActivityModal: React.FC<AddModalProps> = ({ open, onCancel, onContinue }: AddModalProps) => {
    const classes = useStyles();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const [warning, setWarning] = React.useState(false);

    const saveActivity = () => {
      if (title === '') {
        setWarning(true);
        return;
      }

      const newActivity = {
        id: 10,
        title: title,
        description: description,
        date: formatDate(selectedDate),
      }

      onContinue(newActivity);

      // Reset Modal values
      setTitle('');
      setDescription('');
      setSelectedDate(new Date());

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.id === "title-field") {
        setWarning(false);
        setTitle(event.target.value);
      } else {
        setDescription(event.target.value);
      }
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Add New Activity</h2>
            <div style={{height: '20px'}}>
              <Typography style={ warning ? {color: 'red'} : {}} variant="caption">
                  Please enter activity title.
              </Typography>
            </div>
            <div style={{marginBottom: 20, marginTop: 10}}>
              <input id="title-field" className={classes.inputField} type='text' placeholder="Activity Name" value={title} onChange={handleChange} />
            </div> 
            <div style={{ marginBottom: 20 }}>
              <Typography style={{ marginRight: 10 }}variant="caption">
                Select Date:
              </Typography>
              <DatePicker selected={selectedDate} onChange={(date: Date) => setSelectedDate(date)}/>
            </div>
            <div style={{height: '20px'}}>
              <Typography variant="caption">
                  Description (optional):
              </Typography>
            </div>
            <div style={{marginBottom: 30, marginTop: 10}}>
              <input id="description-field" className={classes.inputField} type='text' placeholder="Description" value={description} onChange={handleChange} />
            </div> 
            
            <button type="button" onClick={onCancel}><Typography variant='button'> Cancel </Typography> </button>
            <button type="button" onClick={saveActivity} style={{ marginLeft: 10 }}><Typography variant='button' > Add </Typography> </button>
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

export default AddActivityModal;