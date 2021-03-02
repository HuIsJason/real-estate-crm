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
    height: "90%",
    transform: 'translate(30%, 10%)',
  },
  cellBody: {
      fontSize: 14
  },
  emptyCellHead: {
    backgroundColor: "#0C3A77",
    color: theme.palette.common.white,
    width: "33%",
    left: "0%"
  },
  clientCellHead: {
    backgroundColor: "#0C3A77",
    color: theme.palette.common.white,
    width: "33%",
    left: "33%"
  },
  tagsCellHead: {
    backgroundColor: "#0C3A77",
    color: theme.palette.common.white,
    width: "33%",
    left: "66%"
  },
  searchBar: {
    border: "1px solid #0C3A77",
  },
  pagination: {
    position: "absolute",
    bottom: "0px",
    right: "0px"
  }
}));