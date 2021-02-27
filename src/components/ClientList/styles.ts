import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  table: {
    position: "absolute",
    width: "75%",
    transform: 'translate(30%, 20%)'
  },
  cellHead: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
  },
  cellBody: {
      fontSize: 14,
  },
}));