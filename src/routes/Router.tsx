import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

const Router:FC = () => (
  <Switch>
    {routes.map((route) => (
      <Route
        key={route.key}
        path={route.path}
        exact={route.exact}
        render={(props) => <route.component {...props} />}
      />
    ))}
    <Route component={PageNotFound} />
  </Switch>
);

export default Router;
