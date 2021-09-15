import React from "react";
import BuyerSidebarRoutes from "./Routes/BuyerSidebarRoutes";
import SellerSidebarRoutes from "./Routes/SellerSidebarRoutes";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../../../assets/icons";
import { connect } from "react-redux";

function Icon({ icon, ...props }) {
	const Icon = Icons[icon];
	return <Icon {...props} />;
}

function SidebarContent(props) {
	const { user } = props;

	let routes = [];
	if (user && user.role === "buyer") {
		routes = BuyerSidebarRoutes;
	} else if (user && user.role === "seller") {
		routes = SellerSidebarRoutes;
	} else {
		routes = BuyerSidebarRoutes;
	}
	return (
		<div className="py-4  text-gray-900 dark:text-gray-400">
			<ul className="mt-6">
				{routes.map((route) => (
					<li className="relative px-6 py-3" key={route.name}>
						<NavLink
							exact
							to={route.path}
							className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
							activeClassName="text-gray-800 dark:text-gray-100"
						>
							<Icon
								className="w-5 h-5 z-10"
								aria-hidden="true"
								icon={route.icon}
							/>
							<span className="ml-4 z-10">{route.name}</span>
							<Route path={route.path} exact={route.exact}>
								<span
									className="absolute inset-y-0 left-0 w-11/12 bg-white bg-opacity-60 rounded-tr-lg rounded-br-lg"
									aria-hidden="true"
								></span>
							</Route>
						</NavLink>
					</li>
				))}
			</ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);
