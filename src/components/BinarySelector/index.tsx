import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BinarySelectorProps from './types';


export default function BinarySelector({ options, selection, setSelection}: BinarySelectorProps) {
    const classes = useStyles();
  
    const handleChange = (value: string) => {
      setSelection(value);
    };

    return (
        <div className={classes.root}>
            <div className={classes.buttonContainer} >
            <button onClick={() => handleChange(options[0].value)} className={selection === options[0].value ? classes.buttonSelected : classes.buttonUnselected}>
              <Typography variant='button'>{options[0].displayName}</Typography>
            </button> 
            <button onClick={() => handleChange(options[1].value)} className={selection !== options[0].value ? classes.buttonSelected : classes.buttonUnselected}>
              <Typography variant='button'>{options[1].displayName}</Typography>
            </button>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 10,
      // width: '100%',
      // borderBottom: '1px solid grey'
    }, 
    buttonContainer: {
      display: 'inline-block',
    },
    buttonUnselected: {
      fontSize: '10px',
      background: "none",
      color: "#202021",
      padding: '8px 12px',
      border: 'none',
      borderRadius: '5%',
      outline: 'none',
      opacity: .3,
      '&:hover' : {
        opacity: .7,
      }
    },
    buttonSelected: {
      background: "none",
      color: "#0C3A77",
      borderRadius: '5%',
      padding: '8px 12px',
      border: 'none',
      outline: 'none',
    }
  }),
);