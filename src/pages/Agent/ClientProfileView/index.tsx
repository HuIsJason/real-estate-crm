import React, { useCallback, useState } from 'react';
import {
  PermNavBar,
  TransparentAppBar,
  ClientProfile,
  ProjectList,
  FavouritedProperties,
} from '../../../components';

const ClientProfilePage: React.FC = () => {
  const [page, setPage] = useState<string>('profile');

  const handlePageChange = useCallback(
    (newPage: string) => {
      setPage(newPage);
    },
    [setPage]
  );

  return (
    <>
      <PermNavBar title="Joey Smith" />
      <TransparentAppBar page={page} handlePageChange={handlePageChange} />
      <ClientProfile page={page} />
      <FavouritedProperties page={page} />
      {page === 'projects' ? <ProjectList /> : null}
    </>
  );
};

export default ClientProfilePage;
