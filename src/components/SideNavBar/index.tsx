import React from 'react';
import {
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
} from '@material-ui/core';
import {
    SupervisorAccount as SupervisorAccountIcon,
    AccountCircle as AccountCircleIcon
} from '@material-ui/icons';

import useStyles from './styles';

const PermNavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography color="primary"variant="h6" noWrap>
            CLIENTS
          </Typography>
        </Toolbar>
        
        {/* <Button variant="outlined" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.editButton}>
            Edit Clients
        </Button>
        
        <Button variant="contained" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.addButton}>
            + Add Client
        </Button> */}

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
                <ListItemIcon> <SupervisorAccountIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={'Clients'} color="primary" />
            </ListItem>

            <ListItem button key={'Profile'}>
                <ListItemIcon> <AccountCircleIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={'Profile'} color="primary" />
            </ListItem>

        </List>
        <Divider color="primary" />
      </Drawer>
    </div>
  );
}

export default PermNavBar;
