import React, {useCallback, useState} from 'react';
import { PermNavBar, ProjectDetailsNav, ProjectOverview, ProjectHistory } from '../../../components';

const ProjectDetailsPage: React.FC = () => {
  const [page, setPage] = useState<string>("overview");

  const handlePageChange = useCallback((newPage: string) => {
    setPage(newPage);
  },[setPage]);

  return (
    <>
        <PermNavBar title="Joey Smith"/>
        <ProjectDetailsNav page={page} handlePageChange={handlePageChange}/>
        <ProjectOverview page={page}/>
        { page === "history" ? <ProjectHistory/> : null }
    </>
  );
};

export default ProjectDetailsPage;
