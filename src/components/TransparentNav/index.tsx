import React from 'react';
import { 
  createStyles, 
  makeStyles, 
  Theme 
} from '@material-ui/core/styles';

import { 
  AppBar,
  Toolbar,
  Typography,
  Button 
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    nav :{
      width: "80%",
      transform: 'translate(20%, 180%)',
      // boxShadow: "0px 10px 10px -10px",
      boxShadow: "0px 0px 0px 0px",
      borderBottom: "2px solid lightgrey"
      
    },
    listButtonsHead: {
      '& > *': {
          margin: theme.spacing(1),
      },
    },
    listButtons: {
      position: "relative",
      float: "left",
      width: "150px",
      height: "40px",
      zIndex: 1,
      marginRight: "100px",
      top: "14px",
      backgroundColor: "transparent",
      color: "black",
      borderRadius: "0px",
      boxShadow: "0px 0px 0px 0px"
    },
    profileButton: {
    },
    projectsButton: {
    },
    favProjectsButton: {
      width: "250px",
      borderBottom: "2px solid #0C3A77",
      borderRadius: "0px"
    }
  }),
);

export default function TransparentAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <AppBar color="transparent" position="static" className={classes.nav}>
          <Toolbar>
            <Button variant="contained" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.profileButton}>
                Profile
            </Button>

            <Button variant="contained" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.projectsButton}>
                Projects
            </Button>

            <Button variant="contained" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.favProjectsButton}>
                Favourited Properties
            </Button>
    
          </Toolbar>
        </AppBar>
    </div>
  );
}