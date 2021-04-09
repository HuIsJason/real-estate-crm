import { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AppBarProps from './types';
import { useUserContext } from '../../contexts/UserContext';

export default function AdminAppBar({ showDashboardbtn }: AppBarProps) {
  const classes = useStyles();
  const history = useHistory();
  const { logoutUser } = useUserContext();

  const handleLogout = useCallback(() => {
    logoutUser();
    history.push('/login');
  }, [history, logoutUser]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Administration
          </Typography>

          {showDashboardbtn ? (
            <Button color="inherit" component={Link} to="/admin">
              {' '}
              Dashboard
            </Button>
          ) : null}
          <Button onClick={handleLogout} color="inherit">
            {' '}
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

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
  })
);
