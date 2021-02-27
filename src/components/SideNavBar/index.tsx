import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Button from '@material-ui/core/Button';

import useStyles from './styles';

const PermNavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            CLIENTS
          </Typography>
        </Toolbar>
        
        <Button variant="outlined" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.editButton}>
            Edit Clients
        </Button>
        
        <Button variant="contained" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.addButton}>
            + Add Client
        </Button>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>

            <ListItem button key={'Clients'}>
                <ListItemIcon> <SupervisorAccountIcon /> </ListItemIcon>
                <ListItemText primary={'Clients'} />
            </ListItem>

            <ListItem button key={'Profile'}>
                <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
                <ListItemText primary={'Profile'} />
            </ListItem>

        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default PermNavBar;
