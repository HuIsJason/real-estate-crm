import React, {useState, useCallback, useRef, useReducer} from 'react';

import useStyles from './styles';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Chip } from '@material-ui/core';

import { ProjectOverviewProps } from './types';

function useToggle(initialValue = true){
  return useReducer((state) => !state, initialValue);
}


const ProjectOverview: React.FC<ProjectOverviewProps> = ({ page }: ProjectOverviewProps) => {
  const classes = useStyles();
  const [description, setDescription] = useState<string>("Joey is looking for his dream house! He wants a place that is near a good school with a lively neighbourhood, so he can raise his son Jonathon in a good environment");
  const [tags, setTags] = useState(["Friendly area", "Nearby school", "Kid friendly"]);
  const [isActive, toggleIsActive] = useToggle();
  const [open, setOpen] = useState(false);
  const [openTag, setOpenTag] = useState(false);

  const render = page === "overview";

  const descripRef = useRef();
  const tagRef = useRef();

  const handleClickOpenTag = useCallback(() => {
      setOpenTag(true);
  },[]);
  
  const handleClickCloseTag = useCallback(() => {
      setOpenTag(false);
  },[]);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  },[]);

  const handleClose = useCallback(() => {
    setOpen(false);
  },[]);

  const handleEdit = useCallback(() => {
    // This callback would contain an API call to edit project overview info in the backend
    const description = descripRef.current as any;

    setDescription(description.value);
    setOpen(false);
  },[setDescription, setOpen]);

  const handleAdd = useCallback(() => {
    // This callback would contain an API call to add a tag to the project overview in the backend
    const tag = tagRef.current as any;

    setTags(arr => [...arr, tag.value]);
    setOpenTag(false);
  },[setTags, setOpenTag]);


  return (
    <div >
    { render && <div className={classes.profileInfoContainer}>
      <div className={classes.contactContainer}>
          <Typography color="primary" className={classes.header + " " + classes.contactInfo}>
            Project Details
          </Typography>

          
            <Typography className={classes.contactInfo}>
              <strong>Description: </strong> {description}
            </Typography>
            <Button variant="outlined" color="primary" className={classes.editButton} onClick={handleClickOpen}> Edit Description </Button>

            <Typography className={classes.contactInfo}>
              <strong>Criteria: </strong> <br/>
              <div >{tags.map( e =>
                  <Chip className={classes.tags} color="primary" label={e}  />
              )}
              </div>
            </Typography>

            <Button variant="outlined" color="primary" className={classes.addTagButton} onClick={handleClickOpenTag}> + ADD TAG </Button>

            <Typography className={classes.contactInfo}>
              <strong>Status:</strong> <Button variant="contained" disableElevation color={isActive ? "primary" : undefined} className={classes.statusButton} onClick={toggleIsActive}> {isActive ? "ACTIVE" : "CLOSED"} </Button>
            </Typography>

      </div>
        <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Description</DialogTitle>
                    <DialogContent>

                    <TextField
                        autoFocus
                        multiline={true}
                        rows={5}
                        defaultValue={description}
                        inputRef={descripRef}
                        margin="dense"
                        id="Description"
                        label="Description"
                        type="Description"
                        fullWidth
                        className={classes.descriptionEdit}
                    />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleEdit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
            </Dialog>

            <Dialog fullWidth maxWidth="sm" open={openTag} onClose={handleClickCloseTag} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Tag Label</DialogTitle>
                    <DialogContent>

                    <TextField
                        autoFocus
                        inputRef={tagRef}
                        margin="dense"
                        id="Tag"
                        label="Tag"
                        type="Description"
                        fullWidth
                        className={classes.descriptionEdit}
                    />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickCloseTag} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAdd} color="primary">
                            Add
                        </Button>
                    </DialogActions>
            </Dialog> 
    </div>
    }
    </div>
  );
}

export default ProjectOverview;

