import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
	confirmShipmentAction,
	loadSellerCompletedAction,
	loadSellerHistoryAction,
	loadUserBankAccountAction,
} from "../../../../redux/actions/sellerActions";
import ConfirmModal from "../../../Shared/ConfirmModal";
import Loader from "../../../Shared/Loader";

import Pagination from "../../../Shared/Pagination/Pagination";
import Table from "../../../Shared/Table";
import Tooltip from "../../../Shared/Tooltip";

let PageSize = 5;

const SellerHistory = (props) => {
	const { sellerHistory, user, sellerCompleted, sellerBankAccounts } = props;
	const sellerHistoryFiltered = sellerHistory?.data;

	const sellerCompletedFiltered = sellerCompleted?.data;

	const [showModalStatus, setShowModalStatus] = useState(false);
	const [shippedProduct, setshippedProduct] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPage2, setCurrentPage2] = useState(1);

	useEffect(() => {
		const { firstPageIndex, lastPageIndex } = currentTableData;
		const { firstPageIndex2, lastPageIndex2 } = currentTableData2;
		props.loadSellerHistory(user.uid, firstPageIndex, lastPageIndex);
		props.loadSellerCompleted(user.uid, firstPageIndex2, lastPageIndex2);
		props.loadUserBankAccount(user.uid);
	}, [currentPage]);

	const onNext = () => {
		setCurrentPage(currentPage + 1);
	};
	const onPrevious = () => {
		setCurrentPage(currentPage - 1);
	};

	const onNext2 = () => {
		setCurrentPage2(currentPage2 + 1);
	};
	const onPrevious2 = () => {
		setCurrentPage2(currentPage2 - 1);
	};

	const handlePageSelect = (page) => {
		setCurrentPage(page);
	};

	const handlePageSelect2 = (page) => {
		setCurrentPage2(page);
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return { firstPageIndex, lastPageIndex };
	}, [currentPage]);

	const currentTableData2 = useMemo(() => {
		const firstPageIndex2 = (currentPage2 - 1) * PageSize;
		const lastPageIndex2 = firstPageIndex2 + PageSize;
		return { firstPageIndex2, lastPageIndex2 };
	}, [currentPage2]);

	const handleShip = (n) => {
		console.log(n);
		setshippedProduct(n.id);
		setShowModalStatus(true);
	};
	const [checked, setChecked] = useState([]);
	const [error, setError] = useState("");
	const handleSelectBid = (id) => {
		if (checked.indexOf(id) !== -1) {
			setChecked(checked.filter((checkBox) => checkBox !== id));
		} else {
			setChecked([...checked, id]);
		}
	};
	const handleConfirmShipped = () => {
		const found = checked.find((n) => n);

		if (!found) {
			setError("Please select a address before confirm");
		} else {
			props.confirmShipment(shippedProduct, found);
			setshippedProduct("");
			setShowModalStatus(false);
		}
	};

	if (!sellerHistory) {
		return <Loader></Loader>;
	}
	const columns = [
		{
			title: "Auction ID",
		},
		{
			title: "Product",
		},
		{
			title: "Base price",
		},
		{
			title: "Highest Bid",
		},
		{
			title: "Highest Bidder",
		},
		{
			title: "Product Status",
		},
		{
			title: "Action",
		},
	];

	return (
		<>
			<div className="py-8">
				<div className="flex-1 flex-col xl:px-4 xl:w-full lg:px-4 lg:w-full md:px-0 md:w-8/12  pb-4 xs:px-0 xs:w-4/12">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg xs:rounded-lg">
								<p className="p-3 text-md font-semibold text-gray-700 dark:text-gray-200 bg-gray-200">
									Pending Transactions
								</p>
								<Table columns={columns}>
									{sellerHistoryFiltered != null &&
										sellerHistoryFiltered.map((n, index) => {
											return (
												<tr key={n.id}>
													<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
														{(currentPage - 1) * PageSize + index + 1}
													</td>
													<td
														className="px-6 py-4  text-sm text-gray-500 "
														data-testid="product_title_pending"
													>
														{n?.title}
													</td>
													<td
														className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
														data-testid="base_price_pending"
													>
														{n?.base_price}
													</td>
													<td
														className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
														data-testid="highest_bid_pending"
													>
														{n?.highest_bid}
													</td>
													<td
														className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
														data-testid="highest_bidder_pending"
													>
														{n?.user_id}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex justify-center items-center space-x-4">
															<span
																className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
																data-testid="product_transaction_status_pending"
															>
																{n?.product_transaction_status}
															</span>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex items-center space-x-4">
															{n?.product_transaction_status === "paid" && (
																<Tooltip
																	color="amber"
																	msg1="Please
																	click
																	the
																	button"
																	msg2="to
																	confirm
																	after
																	shipping
																	the
																	product
																	to
																	user"
																>
																	<button
																		layout="link"
																		size="icon"
																		aria-label="bids"
																		className="hover:text-aucti"
																		onClick={() => handleShip(n)}
																	>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className="h-6 w-6"
																			fill="none"
																			viewBox="0 0 24 24"
																			stroke="currentColor"
																		>
																			<path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth="2"
																				d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
																			/>
																		</svg>
																	</button>
																</Tooltip>
															)}
														</div>
													</td>
												</tr>
											);
										})}
								</Table>
								{sellerHistoryFiltered !== null &&
									sellerHistoryFiltered?.length === 0 && (
										<div className="w=full flex justify-center items-center p-8">
											No successful bid data available!
										</div>
									)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid justify-items-end px-8 pt-8 pb-8">
					<Pagination
						currentPage={currentPage}
						totalCount={sellerHistory?.length}
						pageSize={PageSize}
						onPageChange={(page) => setCurrentPage(page)}
						onNext={onNext}
						onPrevious={onPrevious}
						handlePageSelect={handlePageSelect}
					/>
				</div>
			</div>
			<div className="pb-16">
				<div className="flex-1 flex-col xl:px-4 xl:w-full lg:px-4 lg:w-full md:px-0 md:w-8/12  pb-4 xs:px-0 xs:w-4/12">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg xs:rounded-lg">
								<p className="p-3 text-md font-semibold text-gray-700 dark:text-gray-200 bg-gray-200">
									Completed Transactions
								</p>
								<Table columns={columns}>
									{sellerCompletedFiltered != null &&
										sellerCompletedFiltered.map((n, index) => {
											return (
												<tr key={n.id}>
													<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
														{(currentPage - 1) * PageSize + index + 1}
													</td>
													<td
														className="px-6 py-4  text-sm text-gray-500 "
														data-testid="product_title_completed"
													>
														{n?.title}
													</td>
													<td
														className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
														data-testid="base_price_completed"
													>
														{n?.base_price}
													</td>
													<td
														className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
														data-testid="highest_bid_completed"
													>
														{n?.highest_bid}
													</td>
													<td
														className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
														data-testid="highest_bidder_completed"
													>
														{n?.user_id}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex justify-center items-center space-x-4">
															<span
																className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
																data-testid="product_transaction_status_completed"
															>
																{n?.product_transaction_status}
															</span>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex items-center space-x-4">
															{/* {n?.product_transaction_status !== "sent" && (
																<Tooltip color="amber">
																	<button
																		layout="link"
																		size="icon"
																		aria-label="bids"
																		className="hover:text-aucti"
																		onClick={() => handleShip(n)}
																	>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className="h-6 w-6"
																			fill="none"
																			viewBox="0 0 24 24"
																			stroke="currentColor"
																		>
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth="2"
																				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
																			/>
																		</svg>
																	</button>
																</Tooltip>
															)} */}
														</div>
													</td>
												</tr>
											);
										})}
								</Table>
								{sellerCompletedFiltered !== null &&
									sellerCompletedFiltered?.length === 0 && (
										<div className="w=full flex justify-center items-center p-8">
											No successful bid data available!
										</div>
									)}
							</div>
						</div>
					</div>
				</div>
				<div className="grid justify-items-end px-8 pt-8 pb-8">
					<Pagination
						currentPage={currentPage2}
						totalCount={sellerCompleted?.length}
						pageSize={PageSize}
						onPageChange={(page) => setCurrentPage2(page)}
						onNext={onNext2}
						onPrevious={onPrevious2}
						handlePageSelect={handlePageSelect2}
					/>
				</div>
			</div>
			<ConfirmModal
				showModal={showModalStatus}
				setShowModal={setShowModalStatus}
			>
				<div className="">
					<div className="w-full h-full text-center">
						<div className="flex h-full flex-col justify-between">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>

							<p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
								Please select a address and confirm that the product has been
								shipped?
							</p>
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
													<div className="flex items-center space-x-4">
														<label className="flex items-center space-x-3 mb-3">
															<input
																type="checkbox"
																name="checked-demo"
																className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
																checked={checked.includes(n.id)}
																disabled={
																	!checked.includes(n.id) && checked.length > 0
																}
																onChange={() => handleSelectBid(n.id)}
															/>
														</label>
													</div>
												</div>
											</div>
										</li>
									);
								})}
							{sellerBankAccounts !== null && sellerBankAccounts.length === 0 && (
								<Link to={"/seller/profile"}>
									<div className=" flex justify-center  text-red-500 p-8 hover:underline">
										No bank account details available to select, Please add a
										bank account on your profile then proceed payment
									</div>
								</Link>
							)}
							<div className="flex items-center justify-between gap-4 w-full mt-8">
								<button
									type="button"
									className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
									onClick={() => {
										setshippedProduct("");
										setShowModalStatus(false);
									}}
								>
									Cancel
								</button>
								<button
									type="button"
									className="py-2 px-4  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
									onClick={handleConfirmShipped}
								>
									Confirm
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
					</div>
				</div>
			</ConfirmModal>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		sellerHistory: state.sellerHistory,
		sellerCompleted: state.sellerCompleted,
		sellerBankAccounts: state.sellerBankAccounts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadSellerHistory: (id, firstPageIndex, lastPageIndex) =>
			dispatch(loadSellerHistoryAction(id, firstPageIndex, lastPageIndex)),
		loadSellerCompleted: (id, firstPageIndex, lastPageIndex) =>
			dispatch(loadSellerCompletedAction(id, firstPageIndex, lastPageIndex)),
		confirmShipment: (product_id, bank_id) =>
			dispatch(confirmShipmentAction(product_id, bank_id)),
		loadUserBankAccount: (id) => dispatch(loadUserBankAccountAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerHistory);
