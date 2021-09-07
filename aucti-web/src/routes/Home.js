import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CustomLayout from "../components/Layouts/CustomLayout";
import Layout from "../components/Layouts/layout";
import LandingPage from "../components/Pages/LandingPage/LandingPage";
import PageNotFound from "../components/Pages/ErrorPage/PageNotFound";
import ProductPage from "../components/Pages/ProductPage/ProductPage";
import SearchPage from "../components/Pages/SearchPage/SearchPage";

const Home = () => {
	return (
		<>
			<CustomLayout>
				<Switch>
					<Route
						exact
						path="/home"
						render={() => <Redirect to="/home/landing" />}
					/>
					<Route path="/home/landing" component={LandingPage} />
					<Route path="/home/product/:id" component={ProductPage} />
					<Route path="/home/search" component={SearchPage} />
					<Route path="/home/**" component={PageNotFound} />
				</Switch>
			</CustomLayout>
		</>
	);
};

export default Home;
