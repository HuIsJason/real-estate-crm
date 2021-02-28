import React from 'react';
import { ClientList } from '../../../components';
import { PermNavBar } from '../../../components';
import { AddClientButton } from '../../../components';

const Agent: React.FC = () => {
  return (
    <>
        <PermNavBar />
        <ClientList />
        <AddClientButton />
    </>
  );
};

export default Agent;
