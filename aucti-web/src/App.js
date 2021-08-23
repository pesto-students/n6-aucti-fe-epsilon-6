import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LandingPage from "./components/Pages/LandingPage/LandingPage";
import PageNotFound from "./components/Pages/ErrorPage/PageNotFound";
import Layout from "./components/Layouts/layout";
import ProductPage from "./components/Pages/ProductPage/ProductPage";
import SearchPage from "./components/Pages/SearchPage/SearchPage";
function App() {
  function onClick() {
    console.log("btn clicked");
  }
  function onChange(e) {
    console.log(e.target.name, e.target.value);
  }
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/product/specific" component={ProductPage} />
          <Route exact path="/searchpage" component={SearchPage} />
          <Route path="/**" component={PageNotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
