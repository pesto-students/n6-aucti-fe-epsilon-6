import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, firebase } from "./config/firebase";

//-----router

import LandingPage from "./components/Pages/LandingPage/LandingPage";
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

function App() {
	// useEffect(() => {
	// 	const unsubscibe = auth.onAuthStateChanged((authUser) => {
	// 		if (!authUser) {
	// 			props.dispatch(logoutUserAction());
	// 		}
	// 	});
	// 	return () => {
	// 		unsubscibe();
	// 	};
	// }, []);
	return (
		<div>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/home" />} />
				<Route path="/login" component={Login} />
				{/* <Route path="/signup" component={Signup} /> */}
				<Route path="/home" component={Nav} />
				{/* <UserRoute path="/register" component={RegisterForm} /> */}
				<BuyerRoute path="/buyer" component={Dashboard} />
				<SellerRoute path="/seller" component={Dashboard} />
				<SellerRoute path="/payments/:bid_id" component={BuyerPayments} />
				<Route path="/**" component={PageNotFound} />
			</Switch>
		</div>
	);
}
// const mapStateToProps = ({ user }) => ({ user });

export default App;
