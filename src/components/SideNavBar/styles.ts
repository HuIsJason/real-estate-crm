import { makeStyles, Theme } from '@material-ui/core';

const drawerWidth = 240;

export default makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white
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
    }
}));