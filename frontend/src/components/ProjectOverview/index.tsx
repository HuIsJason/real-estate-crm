import React, { useState, useCallback, useRef, useEffect } from 'react';

import useStyles from './styles';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Chip,
} from '@material-ui/core';

import { ProjectOverviewProps } from './types';
import { getProject, editProject } from '../../actions/project';

const ProjectOverview: React.FC<any> = ({
  page,
  projectId,
  clientId,
  projectLabel,
}: any) => {
  const classes = useStyles();
  const [description, setDescription] = useState<string>('Not available');
  const [tags, setTags] = useState(['']);
  const [open, setOpen] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [isActive, setActive] = useState(false);

  const render = page === 'overview';

  const descripRef = useRef();
  const tagRef = useRef();

  useEffect(() => {
    getProject(projectId, clientId, setDescription, setTags, tags, setActive);
  }, []);

  const handleClickOpenTag = useCallback(() => {
    setOpenTag(true);
  }, []);

  const handleClickCloseTag = useCallback(() => {
    setOpenTag(false);
  }, []);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleEdit = useCallback(() => {
    const description = descripRef.current as any;

    const changedField = 'description';
    const change = description.value;

    editProject({
      projectId,
      clientId,
      setDescription,
      setTags,
      setActive,
      tags,
      changedField,
      change,
    });

    setOpen(false);
  }, [setTags, setDescription, tags, setOpen, setActive, clientId, projectId]);

  const handleAdd = useCallback(() => {
    const tag = tagRef.current as any;

    const changedField = 'tags';
    const change = tag.value;

    editProject({
      projectId,
      clientId,
      setDescription,
      setTags,
      setActive,
      tags,
      changedField,
      change,
    });

    setOpenTag(false);
  }, [
    setTags,
    setDescription,
    tags,
    setOpenTag,
    setActive,
    clientId,
    projectId,
  ]);

  const handleStatusToggle = useCallback(() => {
    const change = !isActive;
    const changedField = 'status';

    editProject({
      projectId,
      clientId,
      setDescription,
      setTags,
      setActive,
      tags,
      changedField,
      change,
    });
  }, [setTags, setDescription, tags, isActive, setActive, clientId, projectId]);

  return (
    <div>
      {render && (
        <div className={classes.profileInfoContainer}>
          <div className={classes.contactContainer}>
            <Typography
              component={'span'}
              color="primary"
              className={classes.header + ' ' + classes.contactInfo}
            >
              Project Details
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Project Name: </strong> {projectLabel}
            </Typography>

            <Typography className={classes.contactInfo}>
              <strong>Description: </strong> {description}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              className={classes.editButton}
              onClick={handleClickOpen}
            >
              {' '}
              Edit Description{' '}
            </Button>

            <Typography component={'div'} className={classes.contactInfo}>
              <strong>Criteria: </strong> <br />
              <div>
                {tags.map((e, i) =>
                  e !== '' ? (
                    <Chip
                      key={i}
                      className={classes.tags}
                      color="primary"
                      label={e}
                    />
                  ) : null
                )}
              </div>
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              className={classes.addTagButton}
              onClick={handleClickOpenTag}
            >
              {' '}
              + ADD TAG{' '}
            </Button>

            <Typography className={classes.contactInfo}>
              <strong>Status:</strong>{' '}
              <Button
                variant="contained"
                disableElevation
                color={isActive ? 'primary' : undefined}
                className={classes.statusButton}
                onClick={handleStatusToggle}
              >
                {' '}
                {isActive ? 'ACTIVE' : 'CLOSED'}{' '}
              </Button>
            </Typography>
          </div>
          <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
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

          <Dialog
            fullWidth
            maxWidth="sm"
            open={openTag}
            onClose={handleClickCloseTag}
            aria-labelledby="form-dialog-title"
          >
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
      )}
    </div>
  );
};

export default ProjectOverview;
