import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUserAction } from "../../../redux/actions/userActions";
import Alert from "../../Shared/Alert";

const Nav = (props) => {
	const { user } = props;

	const handleLogout = () => {
		props.dispatch(logoutUserAction());
	};

	return (
		<>
			<nav className="mt-2">
				{user && (
					<div>
						<button
							className="h-10 px-5 text-gray-900 transition-colors duration-150 border border-aucti rounded-lg focus:shadow-outline hover:bg-aucti hover:text-gray-900 float-right m-2"
							onClick={handleLogout}
						>
							Logout
						</button>
						<p className="m-2">{user?.displayName}</p>
					</div>
				)}

				{!user && (
					<>
						<NavLink
							to="/signup"
							className="h-10 px-5 text-gray-900 transition-colors duration-150 border border-aucti rounded-lg focus:shadow-outline hover:bg-aucti hover:text-gray-900 float-right m-2"
						>
							Signup
						</NavLink>

						<NavLink
							to="/login"
							className="h-10 px-5 text-gray-900 transition-colors duration-150 border border-aucti rounded-lg focus:shadow-outline hover:bg-aucti hover:text-gray-900 float-right m-2"
						>
							Signin
						</NavLink>
					</>
				)}
			</nav>
			<Alert />
		</>
	);
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Nav);
