import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import { loadBidsWithUsersAction } from "../../../../redux/actions/sellerActions";
import ConfirmModal from "../../../Shared/ConfirmModal";
import Loader from "../../../Shared/Loader";
import Modal from "../../../Shared/Modal";
import Pagination from "../../../Shared/Pagination/Pagination";

let PageSize = 5;

const SellerProductsBids = (props) => {
	const [bidAmount, setBidAmount] = useState("");
	const { productId, bidsWithUsers } = props;

	const [showModal, setShowModal] = useState(false);

	const [showModalDelete, setShowModalDelete] = useState(false);
	const [selectedBidForOverride, setSelectedBidForOverride] = useState("");
	const [selectedBidForDelete, setSelectedBidForDelete] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [bids, setBids] = useState(bidsWithUsers?.data);

	useEffect(() => {
		const { firstPageIndex, lastPageIndex } = currentTableData;

		props.loadBidsWithUsers(productId, firstPageIndex, lastPageIndex);
	}, [currentPage]);

	useEffect(() => {
		if (bidsWithUsers && bidsWithUsers?.data !== bids) {
			setBids(bidsWithUsers?.data);
			setLoading(false);
		}
	}, [bidsWithUsers]);
	// const handleEdit = (bid) => {
	// 	setSelectedBidForOverride(bid);
	// 	setShowModal(true);
	// };

	// const handleDelete = (n) => {
	// 	setSelectedBidForDelete(n);
	// 	setShowModalDelete(true);
	// };

	const handlePrice = (e) => {
		setBidAmount(e.target.value);
	};

	const handleBidOverride = (e) => {
		e.preventDefault();
		props.overrideBid({ ...selectedBidForOverride, bid_price: bidAmount });
		setBidAmount("");
		setSelectedBidForOverride("");
		setShowModal(false);
	};

	const handleDeleteBid = () => {
		props.deleteBid(selectedBidForDelete.id);
		setSelectedBidForDelete("");
		setShowModalDelete(false);
	};

	const onNext = () => {
		setCurrentPage(currentPage + 1);
	};
	const onPrevious = () => {
		setCurrentPage(currentPage - 1);
	};

	const handlePageSelect = (page) => {
		setCurrentPage(page);
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return { firstPageIndex, lastPageIndex };
	}, [currentPage]);

	if (loading) {
		return <Loader></Loader>;
	}

	return (
		<>
			<div className="pb-16">
				<div className="flex-1 flex-col px-4 pb-4">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg xs:rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-900">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												BID ID
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												Buyer
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												Bid Price
											</th>

											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												Action
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{bids != null &&
											bids.length > 0 &&
											bids.map((n, index) => {
												return (
													<tr key={n.id}>
														<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
															{(currentPage - 1) * PageSize + index + 1}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
															{n.user.name}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
															{n.bid_price}
														</td>

														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															<div className="flex items-center space-x-4">
																<label className="flex items-center space-x-3 mb-3">
																	<input
																		type="checkbox"
																		name="checked-demo"
																		className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
																		checked={props.checked.includes(n.id)}
																		disabled={
																			!props.checked.includes(n.id) &&
																			props.checked.length > 0
																		}
																		onChange={() => props.handleSelectBid(n.id)}
																	/>
																	<span className="text-gray-700 dark:text-white font-normal">
																		Select Bid
																	</span>
																</label>
															</div>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
								{bids !== null && bids?.length === 0 && (
									<div className="w=full flex justify-center items-center p-8">
										No bid data available!
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid justify-items-end px-8 pt-8 pb-8">
					<Pagination
						currentPage={currentPage}
						totalCount={bidsWithUsers?.length}
						pageSize={PageSize}
						onPageChange={(page) => setCurrentPage(page)}
						onNext={onNext}
						onPrevious={onPrevious}
						handlePageSelect={handlePageSelect}
					/>
				</div>

				<Modal
					showModal={showModal}
					title={"Bid Again"}
					setShowModal={setShowModal}
				>
					<form action="#" method="POST">
						<div className="">
							<label
								htmlFor="price"
								className="block text-sm font-medium text-gray-700"
							>
								Your Bid Price
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<span className="text-gray-500 sm:text-sm">₹</span>
								</div>
								<input
									type="number"
									name="price"
									id="price"
									className="mt-1 block w-full pl-7 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="0.00"
									onChange={handlePrice}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between gap-4 w-full pt-12">
							<button
								type="button"
								className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
								onClick={() => {
									setShowModal(false);
									setSelectedBidForOverride("");
								}}
							>
								Cancel
							</button>
							<button
								type="button"
								className="py-2 px-4  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
								onClick={handleBidOverride}
							>
								Save
							</button>
						</div>
					</form>
				</Modal>
				<ConfirmModal
					showModal={showModalDelete}
					setShowModal={setShowModalDelete}
				>
					<div className="">
						<div className="w-full h-full text-center">
							<div className="flex h-full flex-col justify-between">
								<svg
									width="40"
									height="40"
									className="mt-4 w-12 h-12 m-auto text-red-500"
									fill="currentColor"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
								</svg>
								<p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
									Remove Bid
								</p>
								<p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
									Are you sure you want to delete this bid ?
								</p>
								<div className="flex items-center justify-between gap-4 w-full mt-8">
									<button
										type="button"
										className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
										onClick={() => {
											setShowModalDelete(false);
											setSelectedBidForDelete("");
										}}
									>
										Cancel
									</button>
									<button
										type="button"
										className="py-2 px-4  bg-red-500 hover:bg-red-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
										onClick={handleDeleteBid}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</ConfirmModal>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		bidsWithUsers: state.bidsWithUsers,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadBidsWithUsers: (productId, firstPageIndex, lastPageIndex) =>
			dispatch(
				loadBidsWithUsersAction(productId, firstPageIndex, lastPageIndex)
			),
		// loadBuyerInsights: (userId) => dispatch(loadBuyerInsightAction(userId)),
		// overrideBid: (bid) => dispatch(overrideBidAction(bid)),
		// deleteBid: (id) => dispatch(deleteBidAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerProductsBids);
