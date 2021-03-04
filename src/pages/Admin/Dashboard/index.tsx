import React from 'react';
import DashboardButton from '../../../components/DashboardButton/index';
import { Link } from  'react-router-dom';


const AdminDashboard: React.FC = () => {

  return (
    <div>
      <h1 style={{ margin: 10}}>Admin Dashboard</h1>
      <DashboardButton title="Account Manager" link='/admin/accounts' />
      <DashboardButton title="Authorization Requests" link='/admin/auth-requests' />
    </div>
  );
};

export default AdminDashboard;
