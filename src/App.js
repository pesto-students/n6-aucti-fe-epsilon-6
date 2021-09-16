import React, { lazy, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import { firebase } from '../src/config/firebase';

const PageNotFound = lazy(() => import('./components/Pages/PageNotFound'));
const Login = lazy(() => import('./components/Pages/Auth/Login/Login'));
const Home = lazy(() => import('./routes/Home'));

import BuyerRoute from './routes/BuyerRoute';
import SellerRoute from './routes/SellerRoute';
import BuyerPaymentRoute from './routes/BuyerPaymentRoute';

import { initializeInterceptor } from './redux/api';
import { Suspense } from 'react';
import Loader from './components/Shared/Loader';

const searchClient = algoliasearch(
  'DZTA0M5OD8',
  'bfcc29ed9a87db03544730c93ed22ac2',
);
function App() {
  useEffect(() => {
    const unsubscibe = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        authUser.getIdToken(true).then(idToken => {
          initializeInterceptor(idToken);
        });
      }
    });
    return () => {
      unsubscibe();
    };
  }, []);

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="aucti_products">
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/login" render={props => <Login {...props} />} />
            <Route path="/home" render={props => <Home {...props} />} />
            <BuyerRoute path="/buyer" />
            <SellerRoute path="/seller" />
            <BuyerPaymentRoute path="/payments/:bid_id" />
            <Route path="/**" render={props => <PageNotFound {...props} />} />
          </Switch>
        </Suspense>
      </InstantSearch>
    </>
  );
}

export default App;
