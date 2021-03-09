import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(3),
    background: '#E7EFFF',
    borderRadius: 20,
    boxShadow: '2px 4px 10px 5px rgba(247, 249, 253, 0.63)',
    padding: '70px 70px',
    display: 'inline-block',
    border: 'none',
    outline: 'none',
    '&:hover': {
      opacity: 0.7,
    },
  },
  text: {
    color: '#0C3A77',
    fontSize: '30px',
  },
}));

export default useStyles;
