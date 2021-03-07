import React from 'react';
import DashboardButton from '../../../components/DashboardButton/index';
import { Link } from  'react-router-dom';
import AppBar from "../../../components/AppBar";


const AdminDashboard: React.FC = () => {

  return (
    <div>
      <AppBar title="" />
      <div>
        <h1 style={{ margin: 10 }}>Admin Dashboard</h1>
        <DashboardButton title="Account Manager" link='/admin/accounts' />
        <DashboardButton title="Authorization Requests" link='/admin/auth-requests' />
      </div>
    </div>
  );
};

export default AdminDashboard;
