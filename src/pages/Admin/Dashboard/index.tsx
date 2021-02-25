import React from 'react';
import { Header } from '../../../components';
import DashboardButton from '../../../components/DashboardButton/index';

import './styles.css'


const AdminDashboard: React.FC = () => {
  return (
    <div className='App'>
      <Header title="Admin Dashboard" />
      <DashboardButton title="Account Manager"/>
      <DashboardButton title="Authorization Requests"/>
    </div>
  );
};

export default AdminDashboard;
