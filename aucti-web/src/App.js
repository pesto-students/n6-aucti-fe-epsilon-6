import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, firebase } from "./config/firebase";

//-----router

import LandingPage from "./components/Pages/LandingPage/LandingPage";

import Layout from "./components/Layouts/layout";
import ProductPage from "./components/Pages/ProductPage/ProductPage";
import SearchPage from "./components/Pages/SearchPage/SearchPage";

import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";

import PageNotFound from "./components/Pages/PageNotFound";

import Dashboard from "./components/Pages/Dashboards/Dashboard";
import Login from "./components/Pages/Auth/Login/Login";
import Signup from "./components/Pages/Auth/Signup/Signup";

import RegisterForm from "./components/Pages/Auth/Signup/RegisterForm";
import { connect } from "react-redux";
import { logoutUserAction, userLoggedIn } from "./redux/actions/userActions";
import Nav from "./components/Pages/LandingPage/Nav";
import BuyerRoute from "./routes/BuyerRoute";
import SellerRoute from "./routes/SellerRoute";
import BuyerPayments from "./components/Pages/Dashboards/Buyer/BuyerPayments";
import Home from "./routes/Home";
const searchClient = algoliasearch(
	"DZTA0M5OD8",
	"bfcc29ed9a87db03544730c93ed22ac2"
);
function App() {
	return (
		<>
			<InstantSearch searchClient={searchClient} indexName="aucti_products">
				<Switch>
					<Route exact path="/" render={() => <Redirect to="/home" />} />
					<Route path="/login" component={Login} />
					<Route path="/home" component={Home} />
					<BuyerRoute path="/buyer" component={Dashboard} />
					<SellerRoute path="/seller" component={Dashboard} />
					<BuyerRoute path="/payments/:bid_id" component={BuyerPayments} />

					<Route path="/**" component={PageNotFound} />
				</Switch>
			</InstantSearch>
		</>
	);
}

export default App;
