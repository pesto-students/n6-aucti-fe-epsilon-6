import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	CartIcon,
	EditIcon,
	MoneyIcon,
	TrashIcon,
} from "../../../../assets/icons";
import { loadBuyerHistoryAction } from "../../../../redux/actions/buyerActions";
import ConfirmModal from "../../../Shared/ConfirmModal";
import Loader from "../../../Shared/Loader";
import Modal from "../../../Shared/Modal";
import Pagination from "../../../Shared/Pagination/Pagination";
import Table from "../../../Shared/Table";

let PageSize = 5;

const BuyerHistory = (props) => {
	const { buyerHistory, user } = props;

	useEffect(() => {
		props.loadBuyerHistory(user.uid);
	}, []);

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = () => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;

		return buyerHistory.slice(firstPageIndex, lastPageIndex);
	};
	if (buyerHistory === null) {
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
			title: "Action",
		},
	];

	return (
		<>
			<div className="py-16">
				<div className="flex-1 flex-col px-4 pb-4">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg xs:rounded-lg">
								<Table columns={columns}>
									{currentTableData() != null &&
										currentTableData().map((n, index) => {
											return (
												<tr key={n.id}>
													<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
														{(currentPage - 1) * PageSize + index + 1}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n.product?.title}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n.product?.base_price}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
														{n?.bid_price}
													</td>
													{/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex justify-center items-center space-x-4">
															<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																{n.product?.auction_status}
															</span>
														</div>
													</td> */}
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex items-center space-x-4">
															<Link to="/">
																<button
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
																{/* <TrashIcon
																	className="w-5 h-5"
																	aria-hidden="true"
																	// onClick={() => handleDelete(n)}
																/> */}
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
						totalCount={buyerHistory.length}
						pageSize={PageSize}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		buyerHistory: state.buyerHistory,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadBuyerHistory: (id) => dispatch(loadBuyerHistoryAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerHistory);
