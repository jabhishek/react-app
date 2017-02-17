import { Route, IndexRoute } from 'react-router';
import React from 'react';
import Todos from './components/todos/todos';
import App from './app';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Todos} />
    <Route path="/todos" component={Todos} />
  </Route>
);

export default routes;
