import React from 'react';
import { addPropertyProps } from './types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';

const AddPropertyModal: React.FC<addPropertyProps> = ({ open, onCancel, onSave }: addPropertyProps) => {
    const classes = useStyles();
    const [addrLine, setAddrLine] = React.useState('');
    const [city, setCity] = React.useState('');
    const [prov, setProv] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');

    const [warning, setWarning] = React.useState(false);

    const saveProperty = () => {
      if (addrLine === '' || city === '' || prov === '' || postalCode === '') {
        setWarning(true);
        return;
      }

      const newProperty = {
        addrLineOne: addrLine,
        city: city,
        province: prov,
        postalCode: postalCode,
        favourited: false,
        activities: [],
        notes: ''
      }

      // Reset Modal values
      setAddrLine('');
      setCity('');
      setProv('');
      setPostalCode('');

      onSave(newProperty);

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWarning(false);
      if (event.target.id === "addr-field") {
        setAddrLine(event.target.value);
      } else if (event.target.id === "city-field") {
        setCity(event.target.value);
      } else if (event.target.id === "prov-field") {
        setProv(event.target.value);
      } else {
        setPostalCode(event.target.value);
      }
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Add New Property</h2>
            <div style={{height: '20px'}}>
              <Typography style={ warning ? {color: 'red'} : {}} variant="caption">
                  Please fill out all address fields.
              </Typography>
            </div>
            <div style={{marginBottom: 10, marginTop: 10}}>
              <input id="addr-field" className={classes.inputField} type='text' placeholder="Street Address" value={addrLine} onChange={handleChange} />
            </div> 
            <div style={{marginBottom: 10}}>
              <input id="city-field" className={classes.inputField} type='text' placeholder="City" value={city} onChange={handleChange} />
            </div> 
            <div style={{marginBottom: 10}}>
              <input id="prov-field" className={classes.inputField} type='text' placeholder="Province" value={prov} onChange={handleChange} />
            </div> 
            <div style={{marginBottom: 30}}>
              <input id="postal-field" className={classes.inputField} type='text' placeholder="Postal Code" value={postalCode} onChange={handleChange} />
            </div> 
            
            <button type="button" onClick={onCancel}><Typography variant='button'> Cancel </Typography> </button>
            <button type="button" onClick={saveProperty} style={{ marginLeft: 10 }}><Typography variant='button'>Save</Typography> </button>
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
      borderRadius: 5,
      borderColor: "#d5d9e3",
      padding: '10px 12px',
      display: 'inline-block',
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

export default AddPropertyModal;