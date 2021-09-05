import React, { useState, Suspense, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import buyerRoutes from "../../routes/BuyerRoute";
import sellerRoutes from "../../routes/SellerRoutes";

import Sidebar from "../Layouts/Sidebar/MainSidebar";
import Header from "../Pages/Dashboards/Header";
import Main from "../Pages/Dashboards/Main";
import Dropdown from "../Shared/Dropdown";

import Loader from "../Shared/Loader";
import Footer from "./Footer";

// import { SidebarContext } from "../context/SidebarContext";

function CustomLayout(props) {
	const { user } = props;
	const [isSidebarOpen, closeSidebar] = useState(false);
	let location = useLocation();

	useEffect(() => {
		closeSidebar(true);
	}, [location]);

	return (
		<div
			className={`flex h-screen bg-gray-50 dark:bg-gray-900
				${isSidebarOpen && "overflow-hidden"}`}
		>
			<div className="flex flex-col flex w-screen">
				<Header />

				<div className="flex flex-row ">
					<Sidebar />
					<Main>{props.children}</Main>
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

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout);
