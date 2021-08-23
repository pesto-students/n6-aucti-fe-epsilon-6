import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleIcon, ActiIcon } from "../../../../assets/icons";
import { loginUserAction } from "../../../../redux/actions/userActions";

const Login = (props) => {
	const handleSignIn = () => {
		props.login();
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
					<div className="flex-1  h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
						<div className="flex flex-col overflow-y-auto md:flex-row">
							<div className="h-32 md:h-auto md:w-1/2">
								<img
									aria-hidden="true"
									className="object-cover w-full h-full dark:hidden"
									src={"https://picsum.photos/1200/800"}
									alt="Office"
								/>
							</div>
							<main className="flex items-center p-6 sm:p-12 md:w-1/2">
								<div className="w-full flex flex-col">
									<div className="w-full flex flex-col items-center">
										<ActiIcon className="fill-current h-full m-4"></ActiIcon>
										<h1 className="text-xl font-semibold align-middle text-gray-700 dark:text-gray-200 m-4">
											Welcome to Aucti!
										</h1>

										<button
											className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-4"
											onClick={handleSignIn}
										>
											<GoogleIcon className="fill-current w-7 h-7 mr-2"></GoogleIcon>
											<span>Sign in with Google</span>
										</button>
									</div>

									<hr className="m-6" />

									<div className="w-full flex flex-col items-center">
										<p className="">
											<Link
												className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
												to="/signup"
											>
												{"Don't have an account? Sign up for free"}
											</Link>
										</p>
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

const mapDispatchToProps = (dispatch) => {
	return {
		login: () => {
			dispatch(loginUserAction());
		},
	};
};

export default connect(null, mapDispatchToProps)(Login);
