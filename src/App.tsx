import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUserContext } from './contexts/UserContext';

import { Agent, Home, Login } from './pages';

const App: React.FC = () => {
  const { user } = useUserContext();

  return (
    <Switch>
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
