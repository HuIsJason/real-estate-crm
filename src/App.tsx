import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import { Admin } from './pages';
import AdminDashboard from './pages/Admin/Dashboard/index';
import AdminAuthRequestView from './pages/Admin/AuthorizationRequest/index';
import AdminAccountManagerView from './pages/Admin/AccountManager/index';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={AdminDashboard} />
      <Route exact path="/admin/auth-requests" component={AdminAuthRequestView} />
      <Route exact path="/admin/accounts" component={AdminAccountManagerView} />
    </Switch>
  );
};

export default App;
