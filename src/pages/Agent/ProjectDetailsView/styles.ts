import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
    linkStyle: { 
        textDecoration: 'none', 
        color: 'black' 
    },
    listButtonsHead: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    backButton: {
        height: '40px',
        top: '9%',
        right:"5%",
        position: "absolute"
    },
}));