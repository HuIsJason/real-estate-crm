import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Admin } from './pages';
import { Agent } from './pages';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Admin} />
      <Route exact path="/ClientList" component={Agent} />
    </Switch>
  );
};

export default App;
