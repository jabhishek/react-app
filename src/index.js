import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import routes from './routes';
import reducers from './reducers/index';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});
const logger = createLogger({
  duration: true,
  collapsed: true
});

const middleWares = [thunk,
	routerMiddleware(browserHistory)];

if (process.env.NODE_ENV !== 'production') {
	middleWares.push(logger);
}

const middleware = applyMiddleware(...middleWares);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(middleware));

const history = syncHistoryWithStore(browserHistory, store);

function renderApp () {
  render((
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
	), document.getElementById('root'));
}
renderApp();
