import React from "react";
import MainSidebarRoutes from "./Routes/MainSidebarRoutes";

import * as Icons from "../../../assets/icons";
import { connect } from "react-redux";
import { filterSearchResultAction } from "../../../redux/actions/userActions";
import history from "../../../routes/history";

import CustomNumericMenu from "../../Shared/CustomNumericMenu ";
import { useState } from "react";
// import "./Sidebar.css";
// import "instantsearch.css/themes/reset.css";

function Icon({ icon, ...props }) {
	const Icon = Icons[icon];
	return <Icon {...props} />;
}

function MainSidebarContent(props) {
	const { priceRangeComponent } = props;
	const [filter, setFilter] = useState("");

	const handleFilter = (filter, path) => {
		props.dispatch(filterSearchResultAction(filter));
		history.push(path);
		setFilter(filter);
	};

	const handleClear = (filter, path) => {
		props.dispatch(filterSearchResultAction(null));
		history.push(path);
		setFilter("");
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
								{priceRangeComponent && (
									<button
										onClick={handleClear}
										className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
									>
										<span className="m-4 z-10">{route.name}</span>
									</button>
								)}
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
								className={`inline-flex items-center w-full text-sm ${
									filter === route.tag ? "font-bold" : "font-semibold"
								} transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200`}
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
			{priceRangeComponent && (
				<div className="flex-col py-5 px-4">
					<div className="inline-flex items-center w-full text-lg font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
						<span>Price Range</span>
					</div>
					<div className="inline-flex items-center w-full text-lg font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 pb-5"></div>
					<div className="w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
						<CustomNumericMenu
							attribute="base_price"
							items={[
								{ label: "<= ₹50000", end: 50000 },
								{ label: "₹50000 - ₹100000", start: 50000, end: 100000 },
								{ label: "₹100000 - ₹200000", start: 100000, end: 200000 },
								{ label: ">= ₹200000", start: 200000 },
							]}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		priceRangeComponent: state.priceRangeComponent,
	};
};

export default connect(mapStateToProps)(MainSidebarContent);
