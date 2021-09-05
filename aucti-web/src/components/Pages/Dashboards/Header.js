import { createPopper } from "@popperjs/core/lib/createPopper";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { SidebarContext } from "../context/SidebarContext";
import {
	SearchIcon,
	MoonIcon,
	SunIcon,
	BellIcon,
	MenuIcon,
	OutlinePersonIcon,
	OutlineCogIcon,
	OutlineLogoutIcon,
	ActiIcon,
} from "../../../assets/icons";
import {
	logoutUserAction,
	toggleSidebarAction,
} from "../../../redux/actions/userActions";
import { Dropdown, DropdownItem } from "@windmill/react-ui";
import Usericon from "../../Shared/usericon";
import history from "../../../routes/history";

function Header(props) {
	const { user } = props;

	// const { toggleSidebar } = useState(false);
	const toggleSidebar = () => {
		props.dispatch(toggleSidebarAction());
	};

	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

	function handleProfileClick() {
		setIsProfileMenuOpen(!isProfileMenuOpen);
	}

	const handleLogout = () => {
		props.dispatch(logoutUserAction());
	};

	const handleBackHome = () => {
		history.push("/");
	};

	return (
		<header className="z-50 py-4 bg-white shadow-bottom dark:bg-gray-800">
			<div className="container flex items-center justify-start h-full xl:px-3 xs:px-0 xl:mx-auto xs:m-0 text-grey-900 dark:text-purple-300">
				<button
					className="xs:p-0 xs:m-0 xl:-ml-0 xs:-ml-8"
					onClick={handleBackHome}
				>
					<ActiIcon className="xl:h-10 xs:h-7"></ActiIcon>
				</button>

				{/* <!-- Mobile hamburger --> */}

				<button
					className="p-1 mr-5 -ml-12 rounded-md lg:hidden focus:outline-none focus:shadow-outline-aucti"
					onClick={toggleSidebar}
					aria-label="Menu"
				>
					<MenuIcon className="w-6 h-6" aria-hidden="true" />
				</button>

				{/* <!-- Search input --> */}

				<div className="flex justify-center flex-1 lg:mr-32  xl:-ml-0 xs:-ml-2">
					<div className="relative w-full max-w-xl mr-6 focus-within:text-gray-400">
						<div className="absolute inset-y-0 flex items-center pl-2">
							<SearchIcon
								className="xl:w-4 xl:h-4 xs:w-3 xs:h-3"
								aria-hidden="true"
							/>
						</div>
						<input
							className="mt-1 xs:w-44 block xl:w-full py-2 xl:px-8 xs:px-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm xs:text-xs"
							placeholder="Search for products"
							aria-label="Search"
						/>
					</div>
				</div>
				<ul className="flex items-center flex-shrink-0 space-x-6 xl:-ml-0 xs:-ml-4 xl:mx-6">
					<li className="relative">
						<button
							className="rounded-full focus:shadow-outline-auctiLight focus:outline-none"
							onClick={handleProfileClick}
						>
							{user ? (
								<img
									className="inline object-cover xl:w-12 xl:h-12 xs:h-10 xs:w-10 mr-2 rounded-full"
									src={user?.photoURL}
									alt="profile-picture"
								/>
							) : (
								<img
									className="inline object-cover w-12 h-12 mr-2 rounded-full"
									src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
									alt="profile-picture"
								/>
							)}
						</button>

						<Dropdown
							align="right"
							isOpen={isProfileMenuOpen}
							onClose={() => setIsProfileMenuOpen(false)}
						>
							{user && (
								<Link to={`/${user.role}`}>
									<DropdownItem className="hover:bg-auctiLight">
										<OutlinePersonIcon
											className="w-4 h-4 mr-3"
											aria-hidden="true"
										/>

										<span>Dashboard</span>
									</DropdownItem>
								</Link>
							)}
							{user ? (
								<DropdownItem
									onClick={handleLogout}
									className="hover:bg-auctiLight"
								>
									<OutlineLogoutIcon
										className="w-4 h-4 mr-3"
										aria-hidden="true"
									/>
									<span>Log out</span>
								</DropdownItem>
							) : (
								<Link to={"/login"}>
									<DropdownItem className="hover:bg-auctiLight">
										<OutlineLogoutIcon
											className="w-4 h-4 mr-3"
											aria-hidden="true"
										/>

										<span>Login</span>
									</DropdownItem>
								</Link>
							)}
						</Dropdown>
					</li>
				</ul>
			</div>
		</header>
	);
}
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
