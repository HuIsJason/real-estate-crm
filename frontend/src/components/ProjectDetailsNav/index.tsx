import React from 'react';

import { 
  AppBar,
  Toolbar,
  Button 
} from '@material-ui/core';

import useStyles from './styles';
import { ProjectDetailsNavProps } from './types';

const ProjectDetailsNav: React.FC<ProjectDetailsNavProps> = ({page, handlePageChange} : ProjectDetailsNavProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <AppBar color="transparent" position="static" className={classes.nav}>
          <Toolbar>
            <Button 
            onClick={() => handlePageChange("overview")} 
            variant="contained" color="primary" 
            classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.profileButton + (page === "overview" ? " " + classes.current : "") }>
                Overview
            </Button>

            <Button 
            onClick={() => handlePageChange("history")} 
            variant="contained" 
            color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.favProjectsButton + (page === "history" ? " " + classes.current : "") }>
                History
            </Button>
    
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default ProjectDetailsNav;