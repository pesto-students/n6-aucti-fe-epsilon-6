import React, { lazy, Suspense } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../components/Shared/Loader';
// import { firebase } from '../../src/config/firebase';
const CustomLayout = lazy(() => import('../components/Layouts/CustomLayout'));
const LandingPage = lazy(() =>
  import('../components/Pages/LandingPage/LandingPage'),
);
const PageNotFound = lazy(() => import('../components/Pages/PageNotFound'));

const ProductPage = lazy(() =>
  import('../components/Pages/ProductPage/ProductPage'),
);
const SearchPage = lazy(() =>
  import('../components/Pages/SearchPage/SearchPage'),
);

const SpeacialPage = lazy(() =>
  import('../components/Pages/SpecialPage/SpeacialPage'),
);

// import { initializeInterceptor } from '../redux/api';

const Home = () => {
  return (
    <>
      <CustomLayout>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              exact
              path="/home"
              render={() => <Redirect to="/home/landing" />}
            />
            <Route path="/home/landing" render={() => <LandingPage />} />
            <Route
              path="/home/special/:category"
              render={() => <SpeacialPage />}
            />
            <Route path="/home/product/:id" render={() => <ProductPage />} />
            <Route path="/home/search" render={() => <SearchPage />} />
            <Route path="/home/**" render={() => <PageNotFound />} />
          </Switch>
        </Suspense>
      </CustomLayout>
    </>
  );
};

export default Home;
