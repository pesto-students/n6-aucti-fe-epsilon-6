import React, { useEffect } from "react";
import { connect } from "react-redux";
import { EditIcon, TrashIcon } from "../../../../assets/icons";
import {
	loadBidAction,
	loadBuyerBidAction,
} from "../../../../redux/actions/bidActions";

const BuyerWishlist = (props) => {
	const { buyerBids, user } = props;

	useEffect(() => {
		props.loadBuyerBids(user.uid);
	}, []);
	return (
		<>
			<div className="overflow-x-auto p-16">
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
							{/* <th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
							>
								Your Bid
							</th> */}
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
										{/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
											{n.bid_price}
										</td> */}
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
											{n.bid_price}
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
												<button layout="link" size="icon" aria-label="Edit">
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
												<button layout="link" size="icon" aria-label="Delete">
													<TrashIcon className="w-5 h-5" aria-hidden="true" />
												</button>
											</div>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			{buyerBids != null && buyerBids.length > 10 && (
				<div className="grid justify-items-end px-16 pt-8">
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
		loadBuyerBids: (id) => dispatch(loadBuyerBidAction(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerWishlist);
