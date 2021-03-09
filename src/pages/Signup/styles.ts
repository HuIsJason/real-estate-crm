import { makeStyles, Theme } from '@material-ui/core';

const useSignupStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(8),
    margin: theme.spacing(8),
    marginLeft: theme.spacing(40),
    marginRight: theme.spacing(40),
    justifyContent: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    display: 'block',
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: theme.spacing(20),
    marginTop: theme.spacing(3),
  },
}));

export default useSignupStyles;
