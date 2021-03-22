import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    //textAlign: 'center',
    padding: theme.spacing(8),
    margin: theme.spacing(10),
    marginLeft: theme.spacing(50),
    marginRight: theme.spacing(50),
    justifyContent: 'center',
    //display: 'flex',
    //alignItems: 'center',
  },
  textField: {
    display: 'block',
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: theme.spacing(20),
    marginTop: theme.spacing(3),
    //marginLeft: theme.spacing(22),
    //marginRight: theme.spacing(100),
  },
}));

export default useStyles;
