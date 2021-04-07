import React, { useCallback, useEffect, useState } from 'react';
import {
  PermNavBar,
  TransparentAppBar,
  ClientProfile,
  ProjectList,
  FavouritedProperties,
} from '../../../components';

import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import {getClient, editClient} from '../../../actions/client';

const ClientProfilePage: React.FC<RouteComponentProps<{clientId: string}>> = ({match}) => {
  const [page, setPage] = useState<string>('profile');

  const [client, setClient] = useState<any>({name: "Not available", phone: "Not available", email: "Not available", address: "Not available"});

  useEffect(() => {
    getClient(match.params.clientId, setClient);
  }, []);

  const handlePageChange = useCallback(
    (newPage: string) => {
      setPage(newPage);
    },
    [setPage]
  );

  return (
    <>
      <PermNavBar title={client.name} />
      <TransparentAppBar page={page} handlePageChange={handlePageChange} />
      <ClientProfile page={page} setClient={setClient} client={client} clientId={match.params.clientId} />
      <FavouritedProperties page={page} />
      {page === 'projects' ? <ProjectList clientId={match.params.clientId} title={client.name} /> : null}
    </>
  );
};

export default ClientProfilePage;
