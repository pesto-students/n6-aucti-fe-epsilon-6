import React, { useState, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes from "../../../routes/BuyerRoutes";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";
import Main from "./Main";
import Loading from "./Loading";
const Page404 = lazy(() => import("../PageNotFound"));

// import { SidebarContext } from "../context/SidebarContext";

function Dashboard() {
	const [isSidebarOpen, closeSidebar] = useState(false);
	let location = useLocation();

	useEffect(() => {
		closeSidebar(true);
	}, [location]);

	return (
		<div
			className={`flex flex-col h-screen bg-gray-50 dark:bg-gray-900
				${isSidebarOpen && "overflow-hidden"}`}
		>
			<Header />

			<div className="flex flex-row flex w-full">
				<Sidebar />
				<Main>
					<Suspense fallback={<Loading />}>
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

export default Dashboard;
