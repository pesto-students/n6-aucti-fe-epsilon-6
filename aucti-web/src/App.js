import React from "react";
import { Route,Switch,Redirect } from "react-router-dom";
//-----router
import Button from "./components/Shared/button";
import Card from "./components/Shared/card";
import Favourite from "./components/Shared/favourite";
import Filter from "./components/Shared/filter";
import Person from "./components/Shared/Person";
import Productpage from "./components/Shared/Productpage";
import Tag from "./components/Shared/tag";
import Notification from "./components/Shared/Notification";
import Quicklink from "./components/Shared/Quicklink";
import Searchbar from "./components/Shared/searchbar";
import LandingPage from "./components/Pages/LandingPage/LandingPage";
import PageNotFound from "./components/Pages/PageNotFound";

import { Star } from "./components/Shared/star";
import Layout from "./components/Layouts/layout";


function App() {
  function onClick(){
    console.log('btn clicked')
  }
  return (
    <div >
     {/* <Card onClick={onClick}/>
     <Button text="Click Me" onClick={onClick} />
     <Favourite onClick={onClick}/>
     <Tag/>
     <Person/>
     <Notification/>
     <Productpage onClick={onClick}/>
     <Filter/>
     <Quicklink/>
     <Searchbar/> */}
   
     <Layout>
     <Switch>
       <Route exact path="/" component={LandingPage} />
       <Route path="/login" component={Tag} />
       <Route path="/**" component={PageNotFound} />
     </Switch>
     </Layout>
    </div>
  );
}

export default App;
