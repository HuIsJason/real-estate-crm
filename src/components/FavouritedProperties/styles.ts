import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  statusCell: {
    color: 'green',
  },
  checkIcon: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    // margin: theme.spacing(20),
    marginTop: theme.spacing(20),
    position: 'relative',
    width: '70%',
    height: '90%',
    marginLeft: '20%',
  },
  pagination: {
    //position: 'absolute',
    bottom: '0px',
    right: '20px',
    marginRight: '10%',
  },
  modal: {
    position: 'absolute',
    width: 700,
    padding: theme.spacing(4, 10, 10),
    top: 100,
    left: '30%',
  },
}));

export default useStyles;
