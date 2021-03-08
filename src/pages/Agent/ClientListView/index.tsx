import React from 'react';
import { ClientList } from '../../../components';
import { PermNavBar } from '../../../components';

const ClientListPage: React.FC = () => {
  return (
    <>
        <PermNavBar />
        <ClientList />
    </>
  );
};

export default ClientListPage;
