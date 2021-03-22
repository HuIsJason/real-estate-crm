import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      nav :{
        width: "80%",
        transform: 'translate(20%, 180%)',
        // boxShadow: "0px 10px 10px -10px",
        boxShadow: "0px 0px 0px 0px",
        borderBottom: "2px solid lightgrey",
        
      },
      listButtonsHead: {
        '& > *': {
            margin: theme.spacing(1),
        },
      },
      listButtons: {
        position: "relative",
        float: "left",
        width: "150px",
        height: "40px", 
        zIndex: 1,
        marginRight: "100px",
        top: "14px",
        backgroundColor: "transparent",
        color: "grey",
        borderRadius: "0px",
        boxShadow: "0px 0px 0px 0px",
        borderBottom: "2px solid lightgrey",
        '&:hover': {
          backgroundColor: "transparent",
          boxShadow: "0px 0px 0px 0px",
          borderBottom: "2px solid #0C3A77"
        }
      },
      profileButton: {
      },
      projectsButton: {
      },
      favProjectsButton: {
        width: "250px",
      },
      current: {
        color: "#0C3A77",
        borderBottom: "2px solid #0C3A77",
        borderRadius: "0px"
      }
}));