import React, { useState, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import buyerRoutes from "../../../routes/BuyerRoutes";
import sellerRoutes from "../../../routes/SellerRoutes";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";
import Main from "./Main";

import Loader from "../../Shared/Loader";
import { connect } from "react-redux";
const Page404 = lazy(() => import("../PageNotFound"));

// import { SidebarContext } from "../context/SidebarContext";

function Dashboard(props) {
	const { user } = props;
	const [isSidebarOpen, closeSidebar] = useState(false);
	let location = useLocation();

	useEffect(() => {
		closeSidebar(true);
	}, [location]);

	let routes = [];

	if (user && user.role === "buyer") {
		routes = buyerRoutes;
	} else if (user && user.role === "seller") {
		routes = sellerRoutes;
	}
	return (
		<div
			className={`flex h-screen bg-gray-50 dark:bg-gray-900
				${isSidebarOpen && "overflow-hidden"}`}
		>
			<div className="flex flex-col flex w-full">
				<Header />
				<div className="flex flex-row ">
					<Sidebar />
					<Main>
						<Suspense fallback={<Loader />}>
							<Switch>
								{routes.map((route, i) => {
									return route.component ? (
										<Route
											key={i}
											exact={true}
											path={`/${user.role}${route.path}`}
											render={(props) => <route.component {...props} />}
										/>
									) : null;
								})}
								<Redirect
									exact
									from={`/${user.role}`}
									to={`/${user.role}/dashboard`}
								/>
								<Route component={Page404} />
							</Switch>
						</Suspense>
					</Main>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
