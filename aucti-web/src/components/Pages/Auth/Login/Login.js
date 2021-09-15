import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleIcon, ActiIcon } from "../../../../assets/icons";
import { loginUserAction } from "../../../../redux/actions/userActions";
import history from "../../../../routes/history";

const Login = (props) => {
	const { user } = props;
	const [role, SetRole] = useState("");
	const [roleErr, SetRoleErr] = useState("");

	useEffect(() => {
		if (user) {
			history.push("/");
		}
	}, []);

	const handleUser = (role) => {
		SetRole(role);
	};

	const handleSignIn = (e) => {
		e.preventDefault();
		if (!role) {
			SetRoleErr("Please select either one role!");
		} else {
			props.login(role);
			SetRoleErr("");
		}
	};
	const refPlaceholder = React.useRef();

	const removePlaceholder = () => {
		refPlaceholder.current.remove();
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-aucti dark:bg-binance-900">
			<div className="flex flex-col">
				<div className="flex flex-row m-4 w-full">
					<Link
						className="text-sm font-medium text-gray-600 dark:text-purple-400 hover:underline"
						to="/"
					>
						{"Back to Aucti"}
					</Link>
				</div>
				<div className="flex flex-row justify-center justify-items-center">
					<div className="flex-1  h-full max-w-4xl mx-auto overflow-hidden bg-white xl:rounded-lg shadow-xl dark:bg-gray-800">
						<div className="flex flex-col overflow-y-auto md:flex-row">
							<div
								ref={refPlaceholder}
								className="md:h-auto w-screen bg-gray-200 rounded-tl animate-pulse"
							></div>
							<div className="h-32 md:h-auto md:w-1/2">
								<img
									aria-hidden="true"
									className="object-cover w-full h-full"
									src={"https://picsum.photos/600/400"}
									alt="Office"
									onLoad={removePlaceholder}
									onError={removePlaceholder}
								/>
							</div>
							<main className="flex items-center p-6 sm:p-12 md:w-1/2">
								<div className="w-full flex flex-col">
									<div className="w-full flex flex-col items-center">
										<ActiIcon className="fill-current h-full m-4"></ActiIcon>
										<h1 className="text-xl font-semibold align-middle text-gray-700 dark:text-gray-200 m-4">
											Welcome to Aucti!
										</h1>
										<div className="flex flex-row items-center">
											<button
												className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
												onClick={() => handleUser("buyer")}
											>
												<span>Buyer</span>
												<svg
													className="w-4 h-4 ml-3 fill-current"
													viewBox="0 0 20 20"
												>
													<path
														d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
														clipRule="evenodd"
														fillRule="evenodd"
													></path>
												</svg>
											</button>
											<p className="mr-4">or</p>
											<button
												className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none focus:ring-2 focus:ring-purple-600"
												onClick={() => handleUser("seller")}
											>
												<span>Seller</span>
												<svg
													className="w-4 h-4 ml-3 fill-current"
													viewBox="0 0 20 20"
												>
													<path
														d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
														clipRule="evenodd"
														fillRule="evenodd"
													></path>
												</svg>
											</button>
										</div>
										<button
											className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-4"
											onClick={handleSignIn}
										>
											<GoogleIcon className="fill-current w-7 h-7 mr-2"></GoogleIcon>
											<span>Sign in with Google</span>
										</button>
										<span
											id="descriptionErr"
											className="text-red-400"
											role="alert"
										>
											{roleErr}
										</span>
									</div>
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => {
	return {
		login: (role) => {
			dispatch(loginUserAction(role));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
