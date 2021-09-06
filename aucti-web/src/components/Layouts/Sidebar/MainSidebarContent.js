import React from "react";
import MainSidebarRoutes from "./Routes/MainSidebarRoutes";
import { Link, NavLink, Route } from "react-router-dom";
import * as Icons from "../../../assets/icons";
import { connect } from "react-redux";
import { filterSearchResultAction } from "../../../redux/actions/userActions";
import history from "../../../routes/history";
import {
	ClearRefinements,
	NumericMenu,
	RefinementList,
} from "react-instantsearch-dom";
// import "./Sidebar.css";
// import "instantsearch.css/themes/reset.css";

function Icon({ icon, ...props }) {
	const Icon = Icons[icon];
	return <Icon {...props} />;
}

function MainSidebarContent(props) {
	const { user } = props;

	const handleFilter = (filter, path) => {
		props.dispatch(filterSearchResultAction(filter));
		history.push(path);
	};

	const handleClear = (filter, path) => {
		props.dispatch(filterSearchResultAction(null));
		history.push(path);
	};

	return (
		<div className="py-4  text-gray-900 dark:text-gray-400">
			<ul className="mt-6">
				{MainSidebarRoutes.map((route) =>
					route.heading ? (
						route.subheading ? (
							<div
								key={route.name}
								className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
							>
								{/* {window.location.pathname === "/home/search" && ( */}
								<button
									onClick={handleClear}
									className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
								>
									<span className="m-4 z-10">{route.name}</span>
								</button>
								{/* )} */}
							</div>
						) : (
							<div
								key={route.name}
								className="inline-flex items-center w-full text-lg font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
							>
								<span className="m-4 z-10">{route.name}</span>
							</div>
						)
					) : (
						<li className="relative px-6 py-3" key={route.name}>
							<button
								key={route.path}
								// to={route.path}
								className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
								// activeClassName="text-gray-800 dark:text-gray-100"
								onClick={() => handleFilter(route.tag, route.path)}
							>
								<Icon
									className="w-5 h-5 z-10"
									aria-hidden="true"
									icon={route.icon}
								/>
								<span className="ml-4 z-10">{route.name}</span>
								{/* <Route path={route.path} exact={route.exact}>
									<span
										className="absolute inset-y-0 left-0 w-11/12 bg-white bg-opacity-60 rounded-tr-lg rounded-br-lg"
										aria-hidden="true"
									></span>
								</Route> */}
							</button>
						</li>
					)
				)}
			</ul>
			{window.location.pathname === "/home/search" && (
				<div className="flex-col py-5 px-5">
					<div className="inline-flex items-center w-full text-lg font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 pb-5">
						{/* <ClearRefinements /> */}
					</div>
					<div className="w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
						<NumericMenu
							attribute="base_price"
							items={[
								{ label: "<= ₹50000", end: 50000 },
								{ label: "₹50000 - ₹100000", start: 50000, end: 100000 },
								{ label: "₹100000 - ₹200000", start: 100000, end: 200000 },
								{ label: ">= ₹200000", start: 200000 },
							]}
						/>

						{/* <RefinementList attribute="product_category" /> */}
					</div>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(MainSidebarContent);
