import React from 'react';
import DashboardButton from '../../../components/DashboardButton/index';
import AppBar from "../../../components/AppBar";
import { makeStyles, Theme, Typography } from '@material-ui/core';


const AdminDashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar showDashboardbtn={false}/>
      <div className={classes.root}>
        <div>
        <div> <Typography variant="h6" gutterBottom color='primary'> Admin Dashboard </Typography> </div>
          <DashboardButton title="Account Manager" link='/admin/accounts' />
          <DashboardButton title="Authorization Requests" link='/admin/auth-requests' />
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(5),
  },
}));

export default AdminDashboard;
