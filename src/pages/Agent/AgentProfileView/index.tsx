import React from 'react';
import { PermNavBar, AgentProfile  } from '../../../components';

const AgentProfilePage: React.FC = () => {

  return (
    <>
        <PermNavBar title="MY PROFILE"/>
        <AgentProfile /> 
    </>
  );
};

export default AgentProfilePage;
