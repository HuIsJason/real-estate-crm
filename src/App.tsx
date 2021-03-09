import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUserContext } from './contexts/UserContext';

import AdminDashboard from './pages/Admin/Dashboard/index';
import AdminAuthRequestView from './pages/Admin/AuthorizationRequest/index';
import { ClientListPage, ClientProfilePage, Home, Login, Signup } from './pages';

import AdminAccountManagerView from './pages/Admin/AccountManager/index';
import ProjectList from './components/ProjectList/index';
import PropertyHistoryDash from './components/PropertyHistoryDash/index';

const App: React.FC = () => {
  const { user } = useUserContext();

  return (
    <Switch>
      <Route exact path="/admin" component={AdminDashboard} />
      <Route exact path="/admin/auth-requests" component={AdminAuthRequestView} />
      <Route exact path="/admin/accounts" component={AdminAccountManagerView} />
      <Route exact path="/project-list" component={ProjectList} />
      <Route exact path="/project/history-dash" component={PropertyHistoryDash} />
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
      <Route exact path="/clientlist" component={Agent} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/ClientList" component={ClientListPage} />
      <Route exact path="/ClientProfile" component={ClientProfilePage} />

    </Switch>
  );
};

export default App;
