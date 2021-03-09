import React, { useState } from 'react';
import Props, { Activity } from './types';
import { uid } from 'react-uid';


import TableRow from './tablerow';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import ActivityDetailModal from './modal';
import AddActivityModal from './addActivityModal';

const entriesPerPage = 10;
const activities: Activity[] = [ 
  { id: 1, title: 'Showing', description: '', date: '2021-01-01' }
]

const defaultActivity = { id: -1, title: '', description: '', date: ''}

const ActivityTable: React.FC = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(0);
  const [displayPage, setDisplayPage] = useState(1);
  const [allActivities, setAllActivities] = useState(activities);
  const [selectedActivity, setSelectedActivity] = useState(defaultActivity);

  const openActivityDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setOpenModal(1);
  }

  const addActivity = (activity: Activity) => {
    activity.id = allActivities.length + 1;
    allActivities.push(activity);

    // Sort by reverse chronological order
    allActivities.sort((a, b) => {
      const aDateParts = a.date.split('-').map(part => parseInt(part));
      const aDate = new Date(aDateParts[0], aDateParts[1] - 1, aDateParts[2]);

      const bDateParts = b.date.split('-').map(part => parseInt(part));
      const bDate = new Date(bDateParts[0], bDateParts[1] - 1, bDateParts[2]);

      return aDate < bDate ? 1 : -1;
    })
    
    setAllActivities(allActivities);
    setOpenModal(0);
  }

  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>
              Activity
            </th>
            <th>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          { allActivities.slice((displayPage - 1) * entriesPerPage, displayPage * entriesPerPage).map(activity => (
            <TableRow 
              key={activity.id} 
              date={activity.date}
              activityTitle={activity.title}
              onClick={() => openActivityDetails(activity)}/> ))}
        </tbody>
      </table>
      <div style={ {marginTop: 10 }}>
        <button className={classes.clearBtn} onClick={() => setOpenModal(2)}> <Typography variant="button">+ Add </Typography> </button>
      </div>
      <br/>
    
      <div className={classes.buttonContainer}>
        { displayPage === 1 ? null : (<button className={classes.button} onClick={()=> setDisplayPage(displayPage - 1)}> Previous </button>) }
        { displayPage === Math.ceil(allActivities.length / entriesPerPage) ? null : (<button className={classes.button} onClick={()=> setDisplayPage(displayPage + 1)}> Next </button>)} 
      </div>
      <ActivityDetailModal open={openModal === 1} activity={selectedActivity} onClose={() => setOpenModal(0)}/>
      <AddActivityModal open={openModal === 2} onCancel={() => setOpenModal(0)} onContinue={addActivity} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
    background: 'white',
    border: '2px solid #F1F2F5',
    padding: '10px 20px',
    width: '500px'
  },
  table: {
    borderCollapse: 'collapse', 
    width: '100%',
    '& td, th': {
      borderBottom: '1px solid #F1F2F5',
      padding: '0.5rem',
      textAlign: 'left',
    },
    '& tbody tr': {
      '&:hover' : {
        backgroundColor: '#F1F2F5',
        opacity: .7,
      }
    }
  },
  text: {
    color: '#98A0A7, 100%',
    fontWeight: 500,
    fontSize: '11px',
  },
  button: {
    background: "white",
    color: "#0C3A77",
    padding: '8px 10px',
    border: '1px solid #F1F2F5',
    borderRadius: '5%',
    outline: 'none',
    '&:hover' : {
      opacity: .7,
    }
  },
  buttonContainer: {
    marginBottom: 0,
    minHeight: '10px'
  },
  clearBtn: {
    border: 'none',
    outline: 'none',
    background: 'none',
    color: "#202021",
    opacity: .3,
    '&:hover' : {
      color: "#0C3A77",
      opacity: 1,
    }

  }
}));

export default ActivityTable;