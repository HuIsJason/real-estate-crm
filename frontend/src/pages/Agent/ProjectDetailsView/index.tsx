import React, {useCallback, useEffect, useState} from 'react';

import { Button } from '@material-ui/core';

import { Link, useHistory, useLocation } from "react-router-dom"

import { PermNavBar, ProjectDetailsNav, ProjectOverview, ProjectHistory } from '../../../components';
import useStyles from './styles';

const ProjectDetailsPage: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<string>("overview");
  const history = useHistory();

  const location: { state: { projectId: string } } = useLocation();

  const handlePageChange = useCallback((newPage: string) => {
    setPage(newPage);
  },[setPage]);

  useEffect(() => {
    if (!location.state) {
      history.push("/client-list");
    }
  }, []);


  return (
    <>
        <PermNavBar title="Joey Smith"/>

        <Button component={ Link } variant="contained" to="/client-details" color="primary" classes={{ root: classes.listButtonsHead}} className={classes.backButton}>
          Back
        </Button>

        <ProjectDetailsNav page={page} handlePageChange={handlePageChange}/>
        <ProjectOverview page={page} projectId={ location.state.projectId }/>
        { page === "history" ? <ProjectHistory projectId={ location.state.projectId } /> : null }
    </>
  );
};

export default ProjectDetailsPage;
