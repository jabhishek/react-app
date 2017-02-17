import { Route, IndexRoute } from 'react-router';
import React from 'react';
import SalesReportSimple from './components/Sales-report-simple/sales-report-simple';
import App from './app';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SalesReportSimple} />
    <Route path="/sales-data" component={SalesReportSimple} />
  </Route>
);

export default routes;
