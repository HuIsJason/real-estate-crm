import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUserContext } from './contexts/UserContext';

import AdminDashboard from './pages/Admin/Dashboard/index';
import AdminAuthRequestView from './pages/Admin/AuthorizationRequest/index';
import { Agent, Home, Login } from './pages';

const App: React.FC = () => {
  const { user } = useUserContext();

  return (
    <Switch>
      <Route exact path="/admin" component={AdminDashboard} />
      <Route exact path="/admin/auth-requests" component={AdminAuthRequestView} />
      <Route
        exact
        path="/"
        render={() => (user ? <Home /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/login"
        render={() => (user ? <Redirect to="/" /> : <Login />)}
      />
      <Route exact path="/ClientList" component={Agent} />
    </Switch>
  );
};

export default App;
