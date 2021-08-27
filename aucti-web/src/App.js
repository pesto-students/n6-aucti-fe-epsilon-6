import React,{useEffect} from "react";
import { Route, Switch} from "react-router-dom";
import {useDispatch} from 'react-redux'
import { productsLoaded } from "./redux/actions/productActions";


import LandingPage from "./components/Pages/LandingPage/LandingPage";
import PageNotFound from "./components/Pages/ErrorPage/PageNotFound";
import Layout from "./components/Layouts/layout";
import ProductPage from "./components/Pages/ProductPage/ProductPage";
import SearchPage from "./components/Pages/SearchPage/SearchPage";
function App() {
  const dispatch=useDispatch()
  useEffect(() => {
   console.log('app rerendered')
   dispatch(productsLoaded())
  }, [])

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
          <Route exact path="/search" component={SearchPage} />
          <Route path="/**" component={PageNotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
