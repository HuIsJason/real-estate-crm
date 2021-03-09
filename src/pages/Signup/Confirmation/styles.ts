import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  returnLink: {
    marginTop: theme.spacing(6),
  },
}));

export default useStyles;
