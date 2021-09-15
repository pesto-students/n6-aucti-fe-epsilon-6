import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	MenuIcon,
	OutlinePersonIcon,
	OutlineLogoutIcon,
	ActiIcon,
} from "../../../assets/icons";
import {
	logoutUserAction,
	toggleSidebarAction,
} from "../../../redux/actions/userActions";
import { Dropdown, DropdownItem } from "@windmill/react-ui";

import history from "../../../routes/history";
import Searchbar from "../../Shared/searchbar";

export const Header = (props)=> {
	const { user } = props;

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
					className="xs:p-0 xs:m-0 xl:-ml-0 xs:-ml-12"
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

				<div className="flex justify-center flex-1 lg:mr-32 -mt-4  xl:-ml-0 xs:-ml-2 lg:-ml-0 md:-ml-0">
					<div className="relative w-full max-w-xl mr-6 focus-within:text-gray-400">
						<Searchbar></Searchbar>
					</div>
				</div>

				<ul className="flex items-center flex-shrink-0 space-x-6 xl:-ml-0 lg:-ml-0 md:-ml-0 xs:-ml-4 xl:mx-6 lg:mx-0 md:mx-0">
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
								<Link to={"/login"}>
									<span className="text-sm font-medium text-gray-900 dark:text-purple-400 hover:underline hover:text-purple-600">
										Login
									</span>
								</Link>
							)}
						</button>
						{user && (
							<Dropdown
								align="right"
								isOpen={isProfileMenuOpen}
								onClose={() => setIsProfileMenuOpen(false)}
							>
								{user && (
									<Link to={`/${user?.role}`}>
										<DropdownItem className="hover:bg-auctiLight">
											<OutlinePersonIcon
												className="w-4 h-4 mr-3"
												aria-hidden="true"
											/>

											<span>Dashboard</span>
										</DropdownItem>
									</Link>
								)}

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
							</Dropdown>
						)}
					</li>
				</ul>
			</div>
		</header>
	);
}
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
