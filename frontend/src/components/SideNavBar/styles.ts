import { makeStyles, Theme } from '@material-ui/core';

const drawerWidth = 240;

export default makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        marginLeft: drawerWidth,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        zIndex: 0
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
      drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    listButtonsHead: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    listButtons: {
        position: "absolute",
        float: "right",
        width: "150px",
        height: "40px",
        top: "10px"
    },
    addButton: {
        right: "10px"
    },
    editButton: {
        right: "180px"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    logoutList: {
        position: "absolute",
        bottom: "5%",
        width: "100%"
    },
    linkStyle: { 
        textDecoration: 'none', 
        color: 'black' 
    }
}));