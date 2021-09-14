import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
	confirmDisputeAction,
	confirmRecievedAction,
	loadBuyerCompletedAction,
	loadBuyerHistoryAction,
} from "../../../../redux/actions/buyerActions";

import ConfirmModal from "../../../Shared/ConfirmModal";
import Loader from "../../../Shared/Loader";

import Pagination from "../../../Shared/Pagination/Pagination";
import Table from "../../../Shared/Table";
import Tooltip from "../../../Shared/Tooltip";

let PageSize = 5;

const BuyerHistory = (props) => {
	const { buyerHistory, user, buyerCompleted } = props;
	const buyerHistoryFiltered = buyerHistory?.data;

	const buyerCompletedFiltered = buyerCompleted?.data;

	const [showModalStatus, setShowModalStatus] = useState(false);
	const [showModalDispute, setShowModalDispute] = useState(false);
	const [shippedProduct, setshippedProduct] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPage2, setCurrentPage2] = useState(1);

	useEffect(() => {
		const { firstPageIndex, lastPageIndex } = currentTableData;
		const { firstPageIndex2, lastPageIndex2 } = currentTableData2;
		props.loadBuyerHistory(user.uid, firstPageIndex, lastPageIndex);
		props.loadBuyerCompleted(user.uid, firstPageIndex2, lastPageIndex2);
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
		setshippedProduct(n.id);
		setShowModalStatus(true);
	};

	const handleDispute = (n) => {
		setshippedProduct(n.id);
		setShowModalDispute(true);
	};

	const handleCofirmReceived = () => {
		props.confirmReceived(shippedProduct);
		setshippedProduct("");
		setShowModalStatus(false);
	};

	const handleRaiseDispute = () => {
		props.confirmDispute(shippedProduct);
		setshippedProduct("");
		setShowModalDispute(false);
	};

	if (!buyerHistory) {
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
			title: "Your Bid",
		},
		{
			title: "Seller",
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
				<div className="flex-1 flex-col xl:px-4 xl:w-full lg:px-4 lg:w-full md:px-4 md:w-9/12  pb-4 xs:px-0 xs:w-4/12">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg xs:rounded-lg">
								<p className="p-3 text-md font-semibold text-gray-700 dark:text-gray-200 bg-gray-200">
									Pending Transactions
								</p>
								<Table columns={columns}>
									{buyerHistoryFiltered != null &&
										buyerHistoryFiltered.map((n, index) => {
											return (
												<tr key={n?.id}>
													<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
														{(currentPage - 1) * PageSize + index + 1}
													</td>
													<td className="px-6 py-4  text-sm text-gray-500 ">
														{n?.title}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n?.base_price}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n?.highest_bid}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n?.seller_id}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex justify-center items-center space-x-4">
															<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																{n?.product_transaction_status}
															</span>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex items-center space-x-4">
															{n?.product_transaction_status === "sent" && (
																<Tooltip
																	color="amber"
																	msg1={"Please click the button"}
																	msg2={"to confirm shipment received "}
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
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth="2"
																				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
																			/>
																		</svg>
																	</button>
																</Tooltip>
															)}
															{n?.product_transaction_status === "sent" && (
																<Tooltip
																	color="amber"
																	msg1={"Please click the button"}
																	msg2={
																		"to raise a dispute regarding received product"
																	}
																>
																	<button
																		layout="link"
																		size="icon"
																		aria-label="bids"
																		className="hover:text-red-500"
																		onClick={() => handleDispute(n)}
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
																				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
																			/>
																		</svg>
																	</button>
																</Tooltip>
															)}
															{n?.product_transaction_status === "pending" && (
																<Link to={`/payments/${n.bid_id}`}>
																	<button className="bg-blue-500 hover:bg-blue-700 text-yellow-300 font-bold py-2 px-4 rounded">
																		Pay Now
																	</button>
																</Link>
															)}
														</div>
													</td>
												</tr>
											);
										})}
								</Table>
								{buyerHistoryFiltered !== null &&
									buyerHistoryFiltered?.length === 0 && (
										<div className="w=full flex justify-center items-center p-8">
											No pending bid data available!
										</div>
									)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid justify-items-end px-8 pt-8 pb-8">
					<Pagination
						currentPage={currentPage}
						totalCount={buyerHistory?.length}
						pageSize={PageSize}
						onPageChange={(page) => setCurrentPage(page)}
						onNext={onNext}
						onPrevious={onPrevious}
						handlePageSelect={handlePageSelect}
					/>
				</div>
			</div>
			<div className="pb-16">
				<div className="flex-1 flex-col xl:px-4 xl:w-full lg:px-4 lg:w-full md:px-4 md:w-9/12  pb-4 xs:px-0 xs:w-4/12">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg xs:rounded-lg">
								<p className="p-3 text-md font-semibold text-gray-700 dark:text-gray-200 bg-gray-200">
									Completed Transactions
								</p>
								<Table columns={columns}>
									{buyerCompletedFiltered != null &&
										buyerCompletedFiltered.map((n, index) => {
											return (
												<tr key={n.id}>
													<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
														{(currentPage - 1) * PageSize + index + 1}
													</td>
													<td className="px-6 py-4  text-sm text-gray-500 ">
														{n?.title}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n?.base_price}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n?.highest_bid}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n?.user_id}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex justify-center items-center space-x-4">
															<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																{n?.product_transaction_status}
															</span>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex items-center space-x-4"></div>
													</td>
												</tr>
											);
										})}
								</Table>
								{buyerCompletedFiltered !== null &&
									buyerCompletedFiltered?.length === 0 && (
										<div className="w=full flex justify-center items-center p-32">
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
						totalCount={buyerCompleted?.length}
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
							{/* <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
									Remove Bid
								</p> */}
							<p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
								Please confrim that the product has been recieved?
							</p>
							<div className="flex items-center justify-between gap-4 w-full mt-8">
								<button
									type="button"
									className="py-2 px-2  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
									onClick={() => {
										setshippedProduct("");
										setShowModalStatus(false);
									}}
								>
									Cancel
								</button>

								<button
									type="button"
									className="py-2 px-2  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
									onClick={handleCofirmReceived}
								>
									Confirm Recieved
								</button>
							</div>
						</div>
					</div>
				</div>
			</ConfirmModal>
			<ConfirmModal
				showModal={showModalDispute}
				setShowModal={setShowModalDispute}
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
							{/* <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
									Remove Bid
								</p> */}
							<p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
								Please confirm to raise a dispute regarding received product?
							</p>
							<div className="flex items-center justify-between gap-4 w-full mt-8">
								<button
									type="button"
									className="py-2 px-2  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
									onClick={() => {
										setshippedProduct("");
										setShowModalDispute(false);
									}}
								>
									Cancel
								</button>
								<button
									type="button"
									className="py-2 px-2  bg-red-500 hover:bg-red-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
									onClick={handleRaiseDispute}
								>
									Raise Dispute
								</button>
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
		buyerCompleted: state.buyerCompleted,
		buyerHistory: state.buyerHistory,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadBuyerHistory: (id, firstPageIndex, lastPageIndex) =>
			dispatch(loadBuyerHistoryAction(id, firstPageIndex, lastPageIndex)),
		loadBuyerCompleted: (id, firstPageIndex, lastPageIndex) =>
			dispatch(loadBuyerCompletedAction(id, firstPageIndex, lastPageIndex)),
		confirmReceived: (product_id) =>
			dispatch(confirmRecievedAction(product_id)),
		confirmDispute: (product_id) => dispatch(confirmDisputeAction(product_id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerHistory);
