import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	CartIcon,
	EditIcon,
	MoneyIcon,
	TrashIcon,
} from "../../../../assets/icons";
import {
	deleteBidAction,
	loadBidAction,
	loadBuyerBidAction,
	overrideBidAction,
} from "../../../../redux/actions/bidActions";
import Alert from "../../../Shared/Alert";
import ConfirmModal from "../../../Shared/ConfirmModal";
import Modal from "../../../Shared/Modal";

const BuyerHome = (props) => {
	const [currentPage, setSurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [bidAmount, setBidAmount] = useState("");
	const { buyerBids, user } = props;
	const [showModal, setShowModal] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [selectedBidForOverride, setSelectedBidForOverride] = useState("");
	const [selectedBidForDelete, setSelectedBidForDelete] = useState("");

	useEffect(() => {
		props.loadBuyerBids(user.uid, currentPage, itemsPerPage);
	}, []);

	// const [buyerBidsFinal, setBuyerBidsFinal] = useState(buyerBids);
	// useEffect(() => {
	// 	setBuyerBidsFinal(buyerBids);
	// }, [buyerBids]);

	const handleEdit = (bid) => {
		setSelectedBidForOverride(bid);
		setShowModal(true);
	};

	const handleDelete = (n) => {
		setSelectedBidForDelete(n);
		setShowModalDelete(true);
	};

	const handlePrice = (e) => {
		setBidAmount(e.target.value);
	};

	const handleBidOverride = (e) => {
		e.preventDefault();
		props.overrideBid({ ...selectedBidForOverride, bid_price: bidAmount });
		setBidAmount("");
		setShowModal(false);
	};

	const handleDeleteBid = () => {
		props.deleteBid(selectedBidForDelete.id);
		setSelectedBidForDelete("");
		setShowModalDelete(false);
	};

	return (
		<>
			{/* <Alert></Alert> */}
			<div className="overflow-y-auto flex-1">
				<h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 px-5 pb-4">
					{"Welcome, " + user?.displayName}
				</h1>

				<div className="md:px-4 mx-auto w-full pb-12">
					<div>
						<div className="flex flex-wrap ">
							<div className="w-full lg:w-6/12 xl:w-3/12 sm:w-6/12 xs:w-6/12 mr-8">
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<span className="font-bold text-xl text-gray-900">
													350,897
												</span>
												<div className="text-sm font-medium text-gray-900">
													Bids
												</div>
											</div>
											<div className="relative w-auto pl-4 flex-initial">
												<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500 bg-opacity-75">
													<MoneyIcon />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-6/12 xl:w-3/12 sm:w-6/12 xs:w-6/12 mr-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<span className="font-bold text-xl text-gray-900">
													{"₹ " + "350,897"}
												</span>
												<div className="text-sm font-medium text-gray-900">
													worth items bought
												</div>
											</div>
											<div className="relative w-auto pl-4 flex-initial ">
												<div className="text-blue-500 dark:text-blue-100 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500 bg-blue-100 dark:bg-blue-500">
													<CartIcon />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

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
												Auction ID
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												Product
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												Base price
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												Highest Bid
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												Your Bid
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
											>
												Auction Status
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
										{buyerBids != null &&
											buyerBids.map((n, i) => {
												return (
													<tr key={n.id}>
														<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
															{i + 1}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
															{n.product?.title}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
															{n.product?.base_price}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
															{n.product?.highest_bid}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
															{n.bid_price}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															<div className="flex justify-center items-center space-x-4">
																<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																	{n.product.auction_status}
																</span>
															</div>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															<div className="flex items-center space-x-4">
																<button
																	layout="link"
																	size="icon"
																	aria-label="Edit"
																	onClick={() => handleEdit(n)}
																>
																	<EditIcon
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</button>
																<button
																	layout="link"
																	size="icon"
																	aria-label="Delete"
																>
																	<TrashIcon
																		className="w-5 h-5"
																		aria-hidden="true"
																		onClick={() => handleDelete(n)}
																	/>
																</button>
															</div>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				{buyerBids != null && buyerBids.length > 0 && (
					<div className="flex justify-items-end px-8 pt-8">
						<nav aria-label="Page navigation">
							<ul className="inline-flex space-x-2">
								<li>
									<button className="flex items-center justify-center w-10 h-10 text-gray-900 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-auctiLight">
										<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
											<path
												d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
												clipRule="evenodd"
												fillRule="evenodd"
											></path>
										</svg>
									</button>
								</li>
								<li>
									<button className="w-10 h-10 text-gray-900 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-auctiLight">
										1
									</button>
								</li>
								<li>
									<button className="w-10 h-10 text-gray-900 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-auctiLight">
										2
									</button>
								</li>
								<li>
									<button className="w-10 h-10 text-white transition-colors duration-150 bg-gray-900 border border-r-0 border-gray-900 rounded-full focus:shadow-outline">
										3
									</button>
								</li>
								<li>
									<button className="flex items-center justify-center w-10 h-10 text-gray-900 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-auctiLight">
										<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
											<path
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
												fillRule="evenodd"
											></path>
										</svg>
									</button>
								</li>
							</ul>
						</nav>
					</div>
				)}
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
	//store.getState()
	return {
		buyerBids: state.buyerBids,
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadBuyerBids: (id, currentPage, itemsPerPage) =>
			dispatch(loadBuyerBidAction(id, currentPage, itemsPerPage)),
		overrideBid: (bid) => dispatch(overrideBidAction(bid)),
		deleteBid: (id) => dispatch(deleteBidAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerHome);
