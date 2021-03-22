import React, {useCallback, useState} from 'react';

import { Button } from '@material-ui/core';

import {Link} from "react-router-dom"

import { PermNavBar, ProjectDetailsNav, ProjectOverview, ProjectHistory } from '../../../components';
import useStyles from './styles';

const ProjectDetailsPage: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<string>("overview");

  const handlePageChange = useCallback((newPage: string) => {
    setPage(newPage);
  },[setPage]);

  return (
    <>
        <PermNavBar title="Joey Smith"/>

        <Button component={ Link } variant="contained" to="/client-details" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.backButton}>
          Back
        </Button>

        <ProjectDetailsNav page={page} handlePageChange={handlePageChange}/>
        <ProjectOverview page={page}/>
        { page === "history" ? <ProjectHistory/> : null }
    </>
  );
};

export default ProjectDetailsPage;
