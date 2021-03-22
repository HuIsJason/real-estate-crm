import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
    listButtonsHead: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    listButtons: {
        float: "right",
        height: "40px",
    },
    addButton: {
        right: "10px"
    },
    editButton: {
        right: "180px"
    }
}));