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
    transform: 'translate(30%, 10%)'
  },
  cellHead: {
      backgroundColor: "#737373",
      color: theme.palette.common.white,
  },
  cellBody: {
      fontSize: 14,
  },
  searchBar : {
    border: "1px solid #737373"
  }
}));