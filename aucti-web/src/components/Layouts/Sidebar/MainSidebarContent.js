import React from "react";
import MainSidebarRoutes from "./Routes/MainSidebarRoutes";
import { Link, NavLink, Route } from "react-router-dom";
import * as Icons from "../../../assets/icons";
import { connect } from "react-redux";
import { filterSearchResultAction } from "../../../redux/actions/userActions";
import history from "../../../routes/history";

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

	return (
		<div className="py-4  text-gray-900 dark:text-gray-400">
			<ul className="mt-6">
				{MainSidebarRoutes.map((route) =>
					route.heading ? (
						<div
							key={route.name}
							className="inline-flex items-center w-full text-lg font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
						>
							<span className="m-4 z-10">{route.name}</span>
						</div>
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
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(MainSidebarContent);
