import React from 'react';
import { ClientList } from '../../../components';
import { PermNavBar } from '../../../components';

const Agent: React.FC = () => {
  return (
    <>
        <PermNavBar />
        <ClientList />
    </>
  );
};

export default Agent;
