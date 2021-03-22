import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountSelectorProps from './types';


export default function AccountSelector({selection, setSelection}: AccountSelectorProps) {
    const classes = useStyles();
  
    const handleChange = (value: string) => {
      setSelection(value);
    };

    return (
        <div className={classes.root}>
            <div className={classes.buttonContainer} >
            <button onClick={() => handleChange('agent')} className={selection === 'agent' ? classes.buttonSelected : classes.buttonUnselected}> Agents</button> 
            <button onClick={() => handleChange('client')} className={selection !== 'agent' ? classes.buttonSelected : classes.buttonUnselected}>Clients</button>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      float: 'right',
    }, 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    buttonContainer: {
      display: 'inline-block',
    },
    buttonUnselected: {
      background: "white",
      color: "#0C3A77",
      padding: '8px 12px',
      border: '1px solid #F1F2F5',
      borderRadius: '5%',
      outline: 'none',
      '&:hover' : {
        opacity: .7,
      }
    },
    buttonSelected: {
      background: "#0C3A77",
      color: "white",
      borderRadius: '5%',
      padding: '8px 12px',
      border: '1px solid #0C3A77',
      outline: 'none',
      '&:hover' : {
        
      }
    }
  }),
);