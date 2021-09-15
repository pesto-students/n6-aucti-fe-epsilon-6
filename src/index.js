import React from 'react';
import { Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import history from './routes/history';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://18e64677b0c64b9e8d15c056af78323a@o1001245.ingest.sentry.io/5960796',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
