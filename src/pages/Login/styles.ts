import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    //alignItems: 'center',
  },
  paper: {
    textAlign: 'center',
    marginTop: theme.spacing(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    display: 'block',
  },
}));

export default useStyles;
