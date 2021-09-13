import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TrashIcon } from "../../../../assets/icons";

import {
	deleteUserBankAccountAction,
	loadUserBankAccountAction,
	saveUserBankAccountAction,
} from "../../../../redux/actions/sellerActions";

const SellerProfile = (props) => {
	const { user, sellerBankAccounts } = props;
	const [account_name, setAccount_name] = useState("");
	const [bank_name, setBank_name] = useState("");
	const [branch_name, setBranch_name] = useState("");
	const [account_no, setAccount_no] = useState("");
	const [ifsc_code, setIfsc_code] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		let valid = true;
		if (!account_name) {
			setError("Account Name cannot be blank");
			valid = false;
		} else if (!bank_name) {
			setError("Bank Name cannot be blank");
			valid = false;
		} else if (!branch_name) {
			setError("Branch Name cannot be blank");
			valid = false;
		} else if (!account_no) {
			setError("Account No cannot be blank");
			valid = false;
		} else if (isNaN(account_no)) {
			setError("Account No cannot be text");
			valid = false;
		} else if (!ifsc_code) {
			setError("IFSC Code cannot be blank");
			valid = false;
		} else if (valid) {
			props.saveUserBankAccount({
				user_id: user.uid,
				account_name,
				bank_name,
				branch_name,
				account_no,
				ifsc_code,
			});
			setAccount_name("");
			setBank_name("");
			setBranch_name("");
			setAccount_no("");
			setIfsc_code("");
			setError("");
		}
	};

	const handleDelete = (id) => {
		props.deleteUserBankAccount(id);
	};

	useEffect(() => {
		props.loadUserBankAccount(user.uid);
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
									<div className="xl:w-96 lg:w-96 md:w-96 xs:w-64">
										<div className="flex flex-wrap col-span-3">
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

										<div className="flex flex-wrap col-span-3 pt-4">
											<div className="w-full">
												<label
													htmlFor="account-name"
													className="block text-sm font-medium text-gray-700"
												>
													Account Name
												</label>
												<input
													type="text"
													name="account_name"
													id="account_name"
													className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													value={account_name}
													onChange={(e) => setAccount_name(e.target.value)}
												/>
											</div>
										</div>
										<div className="flex flex-wrap col-span-3 pt-4">
											<div className="w-full ">
												<label
													htmlFor="bank-name"
													className="block text-sm font-medium text-gray-700"
												>
													Bank Name
												</label>
												<input
													type="text"
													name="bank_name"
													id="bank_name"
													className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													value={bank_name}
													onChange={(e) => setBank_name(e.target.value)}
												/>
											</div>
										</div>
										<div className="flex flex-wrap col-span-3 pt-4">
											<div className="w-full ">
												<label
													htmlFor="branch-name"
													className="block text-sm font-medium text-gray-700"
												>
													Branch Name
												</label>
												<input
													type="text"
													name="branch_name"
													id="branch_name"
													className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													value={branch_name}
													onChange={(e) => setBranch_name(e.target.value)}
												/>
											</div>
										</div>
										<div className="flex flex-wrap col-span-3 pt-4">
											<div className="w-full ">
												<label
													htmlFor="account-no"
													className="block text-sm font-medium text-gray-700"
												>
													Account No.
												</label>
												<input
													type="number"
													name="account_no"
													id="account_no"
													className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													value={account_no}
													onChange={(e) => setAccount_no(e.target.value)}
												/>
											</div>
										</div>
										<div className="flex flex-wrap col-span-3 pt-4">
											<div className="w-full ">
												<label
													htmlFor="ifsc-code"
													className="block text-sm font-medium text-gray-700"
												>
													IFSC code
												</label>
												<input
													type="text"
													name="ifsc_code"
													id="ifsc_code"
													className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													value={ifsc_code}
													onChange={(e) => setIfsc_code(e.target.value)}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-aucti hover:bg-auctiHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										onClick={handleSubmit}
									>
										Save
									</button>
								</div>
								<div className="text-right sm:px-6">
									<span
										data-testid="titleErr"
										id="titleErr"
										style={{ color: "red", fontSize: "12px" }}
									>
										{error}
									</span>
								</div>
							</div>
						</form>
						<div className="mx-10 xl:my-0 md:my-10 xs:my-10 overflow-auto xl:h-96 xs:h-32">
							<div className="container flex flex-col mx-auto    items-center justify-center">
								<ul className="flex flex-col">
									{sellerBankAccounts !== null &&
										sellerBankAccounts.map((n) => {
											return (
												<li
													key={n.id}
													className="border-gray-400 flex flex-row mb-2"
												>
													<div className="border-gray-400 border rounded select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 justify-between items-center p-4 ">
														<div className="flex flex-col text-xs">
															<p>{n.account_name}</p>
															<p>{n.bank_name}</p>
															<p>{n.branch_name}</p>
															<p>{n.account_no}</p>
															<p>{n.ifsc_code}</p>
														</div>

														<div className="w-12 text-right flex justify-end hover:text-aucti">
															<button
																layout="link"
																size="icon"
																aria-label="Delete"
																onClick={() => handleDelete(n.id)}
															>
																<TrashIcon
																	className="w-5 h-5"
																	aria-hidden="true"
																/>
															</button>
														</div>
													</div>
												</li>
											);
										})}
								</ul>
								{sellerBankAccounts !== null &&
									sellerBankAccounts.length === 0 && (
										<div className="w=full flex justify-center items-center p-8">
											No bank account details available!
										</div>
									)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		sellerBankAccounts: state.sellerBankAccounts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadUserBankAccount: (id) => dispatch(loadUserBankAccountAction(id)),
		saveUserBankAccount: (account) =>
			dispatch(saveUserBankAccountAction(account)),
		deleteUserBankAccount: (id) => dispatch(deleteUserBankAccountAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);
