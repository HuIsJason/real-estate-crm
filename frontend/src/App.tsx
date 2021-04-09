import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUserContext } from './contexts/UserContext';

import AdminDashboard from './pages/Admin/Dashboard/index';
import AdminAuthRequestView from './pages/Admin/AuthorizationRequest/index';
import AdminAccountManagerView from './pages/Admin/AccountManager/index';
import {
  ClientListPage,
  ClientProfilePage,
  Login,
  Signup,
  ProjectDetailsPage,
  AgentProfilePage,
  Loading,
} from './pages';

const App: React.FC = () => {
  const { user, checkSession } = useUserContext();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <Switch>
      <Route
        exact
        path="/admin"
        render={() =>
          user?.accountType === 'admin' ? (
            <AdminDashboard />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/admin/auth-requests"
        render={() =>
          user?.accountType === 'admin' ? (
            <AdminAuthRequestView />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route 
        exact 
        path="/admin/accounts" 
        render={() =>
          user?.accountType === 'admin' ? (
            <AdminAccountManagerView />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/"
        render={() =>
          user?.accountType === 'agent' ? (
            <Redirect to="/client-list" />
          ) : user?.accountType === 'admin' ? (
            <Redirect to="/admin" />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/client-list"
        render={() =>
          user?.accountType === 'agent' ? (
            <ClientListPage />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/login"
        render={() =>
          user?.accountType === 'agent' ? (
            <Redirect to="/client-list" />
          ) : user?.accountType === 'admin' ? (
            <Redirect to="/admin" />
          ) : (
            <Login />
          )
        }
      />
      <Route exact path="/signup" component={Signup} />
      <Route
        exact
        path="/client-details/:clientId"
        render={(props) =>
          user?.accountType === 'agent' ? (
            <ClientProfilePage {...props} />
          ) : (
            <Loading />
          )
        }
      />
      <Route
        exact
        path="/client-details/:clientId/project-details"
        render={() =>
          user?.accountType === 'agent' ? <ProjectDetailsPage /> : <Loading />
        }
      />
      <Route
        exact
        path="/agent-details"
        render={() =>
          user?.accountType === 'agent' ? <AgentProfilePage /> : <Loading />
        }
      />
    </Switch>
  );
};

export default App;
