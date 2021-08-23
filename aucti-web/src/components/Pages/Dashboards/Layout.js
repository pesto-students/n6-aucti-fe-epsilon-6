import React, { useContext, useState, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes from "../../../routes/BuyerRoutes";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
import LandingPage from "../LandingPage/LandingPage";
import Buyer from "./Buyer/BuyerHome";
import Seller from "./Seller/SellerHome";
import Login from "../Auth/Login/Login";
import Signup from "../Auth/Signup/Signup";
import SuspensePage from "./SuspensePage";
import PageNotFound from "../PageNotFound";
// import ThemedSuspense from "../components/ThemedSuspense";
// import { SidebarContext } from "../context/SidebarContext";

const Page404 = lazy(() => import("../../Pages/PageNotFound"));

function Layout() {
	const { isSidebarOpen, closeSidebar } = useState(false);
	let location = useLocation();

	// useEffect(() => {
	// 	closeSidebar(true);
	// }, [location]);

	return (
		<div
			className={`flex flex-col h-screen bg-gray-50 dark:bg-gray-900
				${isSidebarOpen && "overflow-hidden"}`}
		>
			<Header />

			<div className="flex flex-row flex-1 w-full">
				<Sidebar />
				<Main>
					<Suspense fallback={<SuspensePage />}>
						<Switch>
							{routes.map((route, i) => {
								return route.component ? (
									<Route
										key={i}
										exact={true}
										path={`/buyer${route.path}`}
										render={(props) => <route.component {...props} />}
									/>
								) : null;
							})}
							<Redirect exact from="/buyer" to="/buyer/dashboard" />
							<Route component={Page404} />
						</Switch>
					</Suspense>
				</Main>
			</div>
		</div>
	);
}

export default Layout;
