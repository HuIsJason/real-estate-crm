import React from 'react';
import DashboardButton from '../../../components/DashboardButton/index';
import { Link } from  'react-router-dom';
import './styles.css'


const AdminDashboard: React.FC = () => {

  return (
    <div className='App'>
      <h1 style={{ margin: 10}}>Admin Dashboard</h1>
      <DashboardButton title="Account Manager" link='/' />
      <DashboardButton title="Authorization Requests" link='/admin/auth-requests' />
    </div>
  );
};

export default AdminDashboard;
