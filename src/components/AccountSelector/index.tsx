import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AccountSelectorProps from './types';


export default function AccountSelector({selection, setSelection}: AccountSelectorProps) {
    const classes = useStyles();
  
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelection(event.target.value as string);
    };

    return (
        <div className={classes.root}>
            <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Account Type </InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selection}
                onChange={handleChange}
                label="Account Type"
            >
            <MenuItem value="agent">Agent</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            </Select>
            </FormControl>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      position: 'absolute',
      right: '10%'
    }, 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);