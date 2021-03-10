import React from 'react';

import { 
  AppBar,
  Toolbar,
  Button 
} from '@material-ui/core';

import useStyles from './styles';
import { TransparentNavBarProps } from './types';

const TransparentAppBar: React.FC<TransparentNavBarProps> = ({page, handlePageChange} : TransparentNavBarProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <AppBar color="transparent" position="static" className={classes.nav}>
          <Toolbar>
            <Button 
            onClick={() => handlePageChange("profile")} 
            variant="contained" color="primary" 
            classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.profileButton + (page === "profile" ? " " + classes.current : "") }>
                Profile
            </Button>

            <Button 
            onClick={() => handlePageChange("projects")} 
            variant="contained" color="primary" 
            classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.projectsButton + (page === "projects" ? " " + classes.current : "") }>
                Projects
            </Button>

            <Button 
            onClick={() => handlePageChange("fav projects")} 
            variant="contained" 
            color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.favProjectsButton + (page === "fav projects" ? " " + classes.current : "") }>
                Favourited Properties
            </Button>
    
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default TransparentAppBar;