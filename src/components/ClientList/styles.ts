import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  main: {
    margin: theme.spacing(4),
    position: 'absolute',
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  buttonContainer: {
    height: '10px',
    marginTop: '100px',
    marginRight: '20px'
  },
  table: {
    width: "75%",
    marginLeft: "15%",
    marginTop: "5%"
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
    border: 'none',
    boxShadow: 'none',
    width: '25%'
  },
  pagination: {
    bottom: "0px",
    right: "0px"
  },
  EButton: {
    height: "10px",
    width: "10px"
  },
  linkStyle: { 
    textDecoration: 'none', 
    color: 'black' 
  }
}));