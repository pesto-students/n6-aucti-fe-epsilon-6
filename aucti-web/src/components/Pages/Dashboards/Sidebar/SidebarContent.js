import React from "react";
import routes from "./Routes/BuyerSidebarRoutes";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../../../assets/icons";
// import SidebarSubmenu from "./SidebarSubmenu";
// import { Button } from '@windmill/react-ui'

function Icon({ icon, ...props }) {
	const Icon = Icons[icon];
	return <Icon {...props} />;
}

function SidebarContent() {
	return (
		<div className="py-4  text-gray-900 dark:text-gray-400">
			<a
				className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
				href="#"
			></a>
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
									className="absolute inset-y-0 left-0 w-11/12 bg-white bg-opacity-50 rounded-tr-lg rounded-br-lg"
									aria-hidden="true"
								></span>
							</Route>
						</NavLink>
					</li>
				))}
			</ul>
			{/* <div className="px-6 my-6">
				<button>
					Create account
					<span className="ml-2" aria-hidden="true">
						+
					</span>
				</button>
			</div> */}
		</div>
	);
}

export default SidebarContent;
