import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  table: {
    position: "absolute",
    width: "60%",
    transform: 'translate(65%, 40%)',
    borderTop: '100px gray'
  },
}));