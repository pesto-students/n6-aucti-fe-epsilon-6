import React from "react";
import { Link } from "react-router-dom";

import {
	GoogleIcon,
	GoogleLightIcon,
	ActiIcon,
} from "../../../../assets/icons";

const Signup = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-aucti dark:bg-binance-900">
			<div className="flex flex-col">
				<div className="flex flex-row m-4 w-full">
					{/* <button className="bg-gray-200 hover:bg-gray-400 font-bold text-gray-600 py-2 px-4 rounded-full">
						{"Back to Aucti"}
					</button> */}
					<Link
						className="text-sm font-medium text-gray-600 dark:text-purple-400 hover:underline"
						to="/"
					>
						Back to Aucti
					</Link>
				</div>
				<div className="flex flex-row justify-center justify-items-center">
					<div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
										<ActiIcon className="fill-current h-full m-6"></ActiIcon>

										<div className="w-full flex flex-col items-center m-6">
											<p className="">
												Already have an account?
												<Link
													className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline ml-1"
													to="/login"
												>
													Sign in
												</Link>
											</p>
										</div>

										<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-6">
											<GoogleIcon className="fill-current w-7 h-7 mr-2"></GoogleIcon>
											<span>Sign up with Google</span>
										</button>
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

export default Signup;
