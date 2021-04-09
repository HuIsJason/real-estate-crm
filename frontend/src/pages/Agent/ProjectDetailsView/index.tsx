import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@material-ui/core';

import { Link, useHistory, useLocation } from 'react-router-dom';

import {
  PermNavBar,
  ProjectDetailsNav,
  ProjectOverview,
  ProjectHistory,
} from '../../../components';
import useStyles from './styles';

const ProjectDetailsPage: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<string>('overview');
  const history = useHistory();

  const location: {
    state: { projectId: string; clientId: string; title: string };
  } = useLocation();

  const handlePageChange = useCallback(
    (newPage: string) => {
      setPage(newPage);
    },
    [setPage]
  );

  useEffect(() => {
    if (!location.state.projectId || !location.state.clientId) {
      history.push('/client-list');
    }
  }, [history, location.state.projectId, location.state.clientId]);

  return (
    <>
      <PermNavBar title={location.state.title} />

      <Button
        component={Link}
        variant="contained"
        to={'/client-details/' + location.state.clientId}
        color="primary"
        classes={{ root: classes.listButtonsHead }}
        className={classes.backButton}
      >
        Back
      </Button>

      <ProjectDetailsNav page={page} handlePageChange={handlePageChange} />
      <ProjectOverview
        page={page}
        projectId={location.state.projectId}
        clientId={location.state.clientId}
      />
      {page === 'history' ? (
        <ProjectHistory projectId={location.state.projectId} />
      ) : null}
    </>
  );
};

export default ProjectDetailsPage;
