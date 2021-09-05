import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditIcon, TrashIcon } from "../../../../assets/icons";
import {
	deleteUserAddressAction,
	loadUserAddressAction,
	saveUserAddressAction,
} from "../../../../redux/actions/buyerActions";

const SellerProfile = (props) => {
	const { user, addresses } = props;
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");

	const handleChangeAddress = (e) => {
		setAddress(e.target.value);
	};

	const handleCity = (e) => {
		setCity(e.target.value);
	};

	const handleState = (e) => {
		setState(e.target.value);
	};

	const handleZip = (e) => {
		setZip(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(user, address, city, state, zip);
		props.saveUserAddress({ user_id: user.uid, address, city, state, zip });
		setAddress("");
		setCity("");
		setState("");
		setZip("");
	};

	const handleDelete = (id) => {
		props.deleteUserAddress(id);
	};

	useEffect(() => {
		props.loadUserAddress(user.uid);
	}, []);

	return (
		<div className="flex flex-col justify-center pb-44">
			<header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 my-4 border-gray-400 border rounded">
				<div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
					<div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
						<div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
							<div className="relative flex items-center w-full lg:w-64 h-full group">
								<p className="my-6 text-xl font-semibold text-gray-900 dark:text-gray-200 px-5 ">
									{user?.displayName}
								</p>
							</div>
						</div>
						<div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
							<a href="#" className="block relative">
								<img
									alt="profil"
									src={user.photoURL}
									className="mx-auto object-cover rounded-full h-10 w-10 "
								/>
							</a>
						</div>
					</div>
				</div>
			</header>
			<div className="mt-10 sm:mt-0 py-8">
				<div className="md:grid md:grid-cols-2 md:gap-6">
					<div className="mt-5 md:mt-0 md:col-span-2 flex xl:flex-row xs:flex-col justify-center">
						<form>
							<div className="overflow-hidden sm:rounded-md border-gray-400 border rounded">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="w-96">
										<div>
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Email address
											</label>
											<input
												type="text"
												name="email-address"
												id="email-address"
												autoComplete="email"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												value={user.email}
												readOnly={true}
											/>
										</div>

										{/* <div className="flex flex-wrap col-span-3">
											<div className="w-full">
												<label
													className="block mb-1"
													htmlFor="formGridCode_card"
												>
													Card number
												</label>
												<input
													className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
													type="text"
													id="formGridCode_card"
												/>
											</div>
										</div> */}
										{/* <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0 col-span-3">
											<div className="w-full px-2 md:w-1/2">
												<label
													className="block mb-1"
													htmlFor="formGridCode_name"
												>
													First name
												</label>
												<input
													className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
													type="text"
													id="formGridCode_name"
												/>
											</div>
											<div className="w-full px-2 md:w-1/2 col-span-3">
												<label
													className="block mb-1"
													htmlFor="formGridCode_last"
												>
													Last name
												</label>
												<input
													className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
													type="text"
													id="formGridCode_last"
												/>
											</div>
										</div> */}
										{/* <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0 col-span-2">
											<div className="w-full px-2 md:w-1/3">
												<label
													className="block mb-1"
													htmlFor="formGridCode_month"
												>
													Month
												</label>
												<input
													className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
													type="text"
													id="formGridCode_month"
												/>
											</div>
											<div className="w-full px-2 md:w-1/3">
												<label
													className="block mb-1"
													htmlFor="formGridCode_year"
												>
													Year
												</label>
												<input
													className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
													type="text"
													id="formGridCode_year"
												/>
											</div>
											<div className="w-full px-2 md:w-1/3">
												<label
													className="block mb-1"
													htmlFor="formGridCode_cvc"
												>
													CVC
												</label>
												<input
													className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
													type="text"
													id="formGridCode_cvc"
												/>
											</div>
										</div> */}
									</div>
								</div>
								{/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-aucti hover:bg-auctiHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										onClick={handleSubmit}
									>
										Save
									</button>
								</div> */}
							</div>
						</form>
					</div>
				</div>
			</div>
			{/** */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		addresses: state.addresses,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadUserAddress: (id) => dispatch(loadUserAddressAction(id)),
		saveUserAddress: (address) => dispatch(saveUserAddressAction(address)),
		deleteUserAddress: (id) => dispatch(deleteUserAddressAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);
