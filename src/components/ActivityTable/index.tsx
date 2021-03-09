import React, { useState } from 'react';
import { Activity, TableProps } from './types';


import TableRow from './tablerow';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import ActivityDetailModal from './modal';
import AddActivityModal from './addActivityModal';

const entriesPerPage = 10;

const defaultActivity = { id: -1, title: '', description: '', date: ''}

const ActivityTable: React.FC<TableProps> = ({ addActivity, activities }: TableProps) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(0);
  const [displayPage, setDisplayPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(defaultActivity);

  const openActivityDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setOpenModal(1);
  }

  const handleAddActivity = (activity: Activity) => {
    addActivity(activity);
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
          { activities.slice((displayPage - 1) * entriesPerPage, displayPage * entriesPerPage).map(activity => (
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
        { displayPage === Math.ceil(activities.length / entriesPerPage) || activities.length === 0? null : (<button className={classes.button} onClick={()=> setDisplayPage(displayPage + 1)}> Next </button>)} 
      </div>
      <ActivityDetailModal open={openModal === 1} activity={selectedActivity} onClose={() => setOpenModal(0)}/>
      <AddActivityModal open={openModal === 2} onCancel={() => setOpenModal(0)} onContinue={handleAddActivity} />
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