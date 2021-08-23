import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import Layout from "./components/Pages/Dashboards/Layout";
import Login from "./components/Pages/Auth/Login/Login";
import Signup from "./components/Pages/Auth/Signup/Signup";
import UserRoute from "./routes/UserRoute";
import RegisterForm from "./components/Pages/Auth/Signup/RegisterForm";

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/home" />} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/home" component={LandingPage} />
				<UserRoute path="/register" component={RegisterForm} />
				<Route path="/buyer" component={Layout} />
				<Route path="/**" component={PageNotFound} />
			</Switch>
		</div>
	);
}

export default App;
