import React, { useCallback } from 'react';
import clsx from 'clsx';
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
    IconButton
} from '@material-ui/core';
import {
    SupervisorAccount as SupervisorAccountIcon,
    AccountCircle as AccountCircleIcon,
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    ExitToApp as ExitToAppIcon
} from '@material-ui/icons';

import {Link} from "react-router-dom"

import { PermBarProps } from './types';

import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles';

const PermNavBar: React.FC<PermBarProps> = ({title} : PermBarProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  },[]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  },[]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" 
      className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >

            <MenuIcon />
          </IconButton>
          <Typography color="primary"variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        open={open}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

          <Link to={"/client-list"} className={classes.linkStyle}>
            <ListItem button key={'Clients'}>
                <ListItemIcon> <SupervisorAccountIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={'Clients'} color="primary" />
            </ListItem>
          </Link>

          <Link to={"/agent-details"} className={classes.linkStyle}>
            <ListItem button key={'Profile'}>
                <ListItemIcon> <AccountCircleIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={'Profile'} color="primary" />
            </ListItem>
          </Link>

        </List>
        <Divider color="primary" />

        <List className={classes.logoutList}>
          <Divider color="primary" />

          <Link to={"/login"} className={classes.linkStyle}>
            <ListItem button key={'Logout'}>
                <ListItemIcon> <ExitToAppIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={'Logout'} color="primary" />
            </ListItem>
          </Link>

          <Divider color="primary" />
        </List>
      </Drawer>
    </div>
  );
}

export default PermNavBar;
