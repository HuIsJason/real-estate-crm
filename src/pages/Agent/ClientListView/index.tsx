import React from 'react';
import { ClientList } from '../../../components';
import { PermNavBar } from '../../../components';

const ClientListPage: React.FC = () => {
  return (
    <>
        <PermNavBar title="CLIENTS"/>
        <ClientList />
    </>
  );
};

export default ClientListPage;
