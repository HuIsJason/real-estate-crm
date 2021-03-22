import { makeStyles, Theme } from "@material-ui/core";
import Props from './types'; 


const NotesSection: React.FC<Props> = ({ notes, onSave } : Props) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onSave(event.target.value);
    }

    return (
        <div className={classes.root}>
            <textarea className={classes.input} onChange={handleChange} placeholder={"No notes to see here, start typing to add notes..."}
                cols={80} rows={30}>
            {notes}
            </textarea>
        </div>
    )


} 

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      margin: theme.spacing(2),
      background: 'white',
      border: '2px solid #F1F2F5',
      padding: '20px 20px',
      width: '500px',
      height: '500px'
    },
    input: {
        border: 'none',
        outline: 'none',
        width: '100%',
        resize: 'none',
        fontFamily: 'Roboto',
        // color: "#a2a6b0", 
        "&::placeholder": {
            color: "#d5d9e3"
        }
    }
}));

export default NotesSection;