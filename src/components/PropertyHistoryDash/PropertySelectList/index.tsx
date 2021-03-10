import { makeStyles, Theme, Typography } from '@material-ui/core';
import Props from './types';

export default function PropertySelectList ( { properties, selected, onSelect } : Props) { 

    const classes = useStyles();

    return (
        <div>
            <Typography style={ { marginBottom: '10px', marginLeft: '10px', color: "#0C3A77" }} variant="h6">Properties</Typography>
            {
            properties.map( property => (
                <div key={property.addrLineOne}> 
                    <button className={property === selected ? classes.buttonSelected : classes.button} onClick={() => onSelect(property)}> 
                        <Typography variant="button"> {property.addrLineOne} </Typography> 
                    </button>
                </div>))  
            }
        </div>
    )
};

const useStyles = makeStyles(() => ({
    button: {
      background: "white",
      color: "#b2b6bf",
      padding: '4px 8px',
      border: '1px solid #e1e4eb',
      borderRadius: '7px',
      outline: 'none',
      width: '200px',
      marginBottom: 5,
      '&:hover' : {
        opacity: 1,
        background: "#e6f0ff",
        color: '#0C3A77',
        border: '1px solid #0C3A77'
      }
    },
    buttonSelected: {
        background: "#e6f0ff",
        color: '#0C3A77',
        border: '1px solid #0C3A77',
        padding: '4px 8px',
        borderRadius: '7px',
        outline: 'none',
        width: '200px',
        marginBottom: 5,
    },
    btnContainer: {
        borderTop: '2px solid #e1e4eb',
        marginTop: 5,
        paddingTop: '5px',
        width: '200px',
    },
    clearBtn: {
        border: 'none',
        outline: 'none',
        background: 'none',
        color: "#202021",
        opacity: .3,
        '&:hover' : {
            color: "#0C3A77",
            opacity: 1,
        }
    }
  }));