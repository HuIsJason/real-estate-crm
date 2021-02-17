import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Admin } from './pages';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Admin} />
    </Switch>
  );
};

export default App;
