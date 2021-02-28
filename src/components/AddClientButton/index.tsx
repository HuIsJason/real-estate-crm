import React from 'react';
import {
    Button
} from '@material-ui/core';

import useStyles from './styles';

const AddClientButton: React.FC = () => {
  const classes = useStyles();

  return (       
        <Button variant="contained" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.listButtons + " " + classes.addButton}>
            + Add Client
        </Button>
  );
}

export default AddClientButton;
