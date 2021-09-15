import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TrashIcon } from "../../../../assets/icons";
import {
	loadBuyerWishlistAction,
	deleteWishlistAction,
} from "../../../../redux/actions/buyerActions";
import ConfirmModal from "../../../Shared/ConfirmModal";
import Loader from "../../../Shared/Loader";

import Pagination from "../../../Shared/Pagination/Pagination";
import Table from "../../../Shared/Table";

let PageSize = 5;

const BuyerWishlist = (props) => {
	const { wishlist, user } = props;

	const [showModalDelete, setShowModalDelete] = useState(false);

	const [selectedWishlistForDelete, setSelectedWishlistForDelete] =
		useState("");

	useEffect(() => {
		props.loadBuyerWishlist(user.uid);
	}, []);

	const handleDelete = (n) => {
		setSelectedWishlistForDelete(n);
		setShowModalDelete(true);
	};

	const handleDeleteWishList = () => {
		props.deleteWislist(selectedWishlistForDelete.id);
		setSelectedWishlistForDelete("");
		setShowModalDelete(false);
	};
	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = () => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;

		return wishlist.slice(firstPageIndex, lastPageIndex);
	};
	if (currentTableData() === null || wishlist === null) {
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
			title: "Auction Status",
		},
		{
			title: "Action",
		},
	];

	if (wishlist === null) {
		return <Loader></Loader>;
	}

	return (
		<>
			<div className="pt-16 pb-64">
				<div className="flex-1 flex-col xl:px-4 xl:w-full lg:px-4 lg:w-full md:px-4 md:w-10/12  pb-4 xs:px-0 xs:w-6/12">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg xs:rounded-lg">
								<Table columns={columns}>
									{currentTableData() != null &&
										currentTableData().map((n, index) => {
											return (
												<tr key={n.product?.id}>
													<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
														{(currentPage - 1) * PageSize + index + 1}
													</td>
													<td className="px-6 py-4 text-sm text-gray-500 ">
														{n.product?.title}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n.product?.base_price}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n.product?.highest_bid}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex justify-center items-center space-x-4">
															<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																{n.product?.auction_status}
															</span>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex items-center space-x-4">
															<Link to={"/home/product/" + n.product?.id}>
																<button
																	className="hover:text-aucti"
																	layout="link"
																	size="icon"
																	aria-label="Edit"
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
																			d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
																		/>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			strokeWidth="2"
																			d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
																		/>
																	</svg>
																</button>
															</Link>
															<button
																layout="link"
																size="icon"
																aria-label="Delete"
															>
																<TrashIcon
																	className="w-5 h-5 hover:text-aucti"
																	aria-hidden="true"
																	onClick={() => handleDelete(n)}
																/>
															</button>
														</div>
													</td>
												</tr>
											);
										})}
								</Table>
								{currentTableData() !== null &&
									currentTableData().length === 0 && (
										<div className="w=full flex justify-center items-center p-8">
											No wishlist data available!
										</div>
									)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid justify-items-end px-8 pt-8 pb-8">
					<Pagination
						currentPage={currentPage}
						totalCount={wishlist.length}
						pageSize={PageSize}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>

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
									Remove item
								</p>
								<p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
									Are you sure you want to delete this bid from wishlist?
								</p>
								<div className="flex items-center justify-between gap-4 w-full mt-8">
									<button
										type="button"
										className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
										onClick={() => {
											setShowModalDelete(false);
											setSelectedWishlistForDelete("");
										}}
									>
										Cancel
									</button>
									<button
										type="button"
										className="py-2 px-4  bg-red-500 hover:bg-red-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
										onClick={handleDeleteWishList}
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
		wishlist: state.wishlist,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadBuyerWishlist: (id) => dispatch(loadBuyerWishlistAction(id)),
		deleteWislist: (id) => dispatch(deleteWishlistAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerWishlist);
