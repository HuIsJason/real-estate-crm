import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
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
        top: "10px",
        zIndex: 1
    },
    addButton: {
        right: "10px"
    },
    editButton: {
        right: "180px"
    }
}));