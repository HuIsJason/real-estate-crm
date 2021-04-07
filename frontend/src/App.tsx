import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUserContext } from './contexts/UserContext';

import AdminDashboard from './pages/Admin/Dashboard/index';
import AdminAuthRequestView from './pages/Admin/AuthorizationRequest/index';
import {
  ClientListPage,
  ClientProfilePage,
  Login,
  Signup,
  ProjectDetailsPage,
  AgentProfilePage,
} from './pages';

import AdminAccountManagerView from './pages/Admin/AccountManager/index';
import ProjectList from './components/ProjectList/index';
import PropertyHistoryDash from './components/PropertyHistoryDash/index';

const App: React.FC = () => {
  const { user, checkSession } = useUserContext();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <Switch>
      <Route exact path="/admin" component={AdminDashboard} />
      <Route
        exact
        path="/admin/auth-requests"
        component={AdminAuthRequestView}
      />
      <Route exact path="/admin/accounts" component={AdminAccountManagerView} />
      <Route exact path="/project-list" component={ProjectList} />
      <Route
        exact
        path="/project/history-dash"
        component={PropertyHistoryDash}
      />
      <Route
        exact
        path="/"
        render={() =>
          user ? <Redirect to="/client-list" /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/client-list"
        render={() => (user ? <ClientListPage /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/login"
        render={() => (user ? <Redirect to="/client-list" /> : <Login />)}
      />
      <Route exact path="/signup" component={Signup} />
      <Route
        exact
        path="/client-details/:clientId"
        component={ClientProfilePage}
      />
      <Route
        exact
        path="/client-details/:clientId/project-details"
        component={ProjectDetailsPage}
      />
      <Route exact path="/agent-details" component={AgentProfilePage} />
    </Switch>
  );
};

export default App;
