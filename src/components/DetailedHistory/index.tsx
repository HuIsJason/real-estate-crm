import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DetailedHistoryProps from './types';
import BinarySelector from '../BinarySelector/index';
import ActivityTable from '../ActivityTable/index';

const tabOptions = [
  {
    value: 'activity',
    displayName: 'Activity'
  },
  {
    value: 'notes',
    displayName: 'Notes'
  }
]


export default function DetailedHistory ( { property, toggleFavourite, addActivity } : DetailedHistoryProps) {
    const classes = useStyles();
    const [currTab, setCurrTab] = useState('activity');

    return (
        <div className={classes.root}>
          <div style={{margin: 15, width: '520px'}}>
            <Typography style={{display: 'inline-block'}} className={classes.headerText} variant="h4"> {property.addrLineOne} </Typography>
            { !property.favourited ? (<button className={classes.button} onClick={() => toggleFavourite(property)}> <Typography variant='caption'>Favourite</Typography> </button>) 
              : (<button className={classes.buttonSelected} onClick={() => toggleFavourite(property)}> <Typography variant='caption'>Favourited</Typography> </button>)
            }
          </div>
          <div>
          <BinarySelector options={tabOptions} selection={currTab} setSelection={(selection) => setCurrTab(selection)}/>
          </div>
          {
            currTab === 'activity' ? 
            (<ActivityTable activities={property.activities} addActivity={addActivity}> </ActivityTable>) : null
          }
          
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(4),
      marginLeft: '2px',
      border: '1px solid #d5d9e3',
      borderRadius: '10px',
      background: 'white',
      padding: '18px 12px',
      paddingLeft: '25px',
      height: '700px',
      width: '600px',
      float: 'right',
      display: 'inline-block'
    },
    headerText: {
      fontWeight: 'bold',
      color: '#0C3A77'
    },
    button: {
      float: 'right',
      background: "#f0f1f5",
      color: "#b2b6bf",
      padding: '4px 8px',
      border: 'none',
      borderRadius: '10px',
      outline: 'none',
      width: '100px',
      marginBottom: 5,
      '&:hover' : {
        opacity: 0.8,
        background: "#e6f0ff",
        color: '#0C3A77',
      }
    },
    buttonSelected: {
        float: 'right',
        background: "#e6f0ff",
        color: '#0C3A77',
        border: 'none',
        padding: '4px 8px',
        borderRadius: '10px',
        outline: 'none',
        width: '100px',
        marginBottom: 5,
        '&:hover' : {
          opacity: 0.7,
        }
    },
  }),
);