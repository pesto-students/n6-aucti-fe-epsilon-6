import React from "react";
import { EditIcon, TrashIcon } from "../../../../assets/icons";

const BuyerHome = () => {
	return (
		<>
			<div className=" md:pt-8 pb-8 pt-8">
				<div className="px-4 md:px-10 mx-auto w-full">
					<div>
						{/* Card stats */}
						<div className="flex flex-wrap justify-center">
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<div className="text-sm font-medium text-gray-900">
													Jane Cooper
												</div>
												<span className="text-sm font-semibold text-gray-900">
													350,897
												</span>
											</div>
											<div className="relative w-auto pl-4 flex-initial">
												<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
													<i className="far fa-chart-bar"></i>
												</div>
											</div>
										</div>
										<p className="text-sm text-blueGray-400 mt-4">
											<span className="text-emerald-500 mr-2">
												<i className="fas fa-arrow-up"></i> 3.48%
											</span>
											<span className="whitespace-nowrap">
												Since last month
											</span>
										</p>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<h5 className="text-blueGray-400 uppercase font-bold text-xs">
													New users
												</h5>
												<span className="font-semibold text-xl text-blueGray-700">
													2,356
												</span>
											</div>
											<div className="relative w-auto pl-4 flex-initial">
												<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
													<i className="fas fa-chart-pie"></i>
												</div>
											</div>
										</div>
										<p className="text-sm text-blueGray-400 mt-4">
											<span className="text-red-500 mr-2">
												<i className="fas fa-arrow-down"></i> 3.48%
											</span>
											<span className="whitespace-nowrap">Since last week</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="overflow-x-auto px-16">
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
								Current price
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
						<tr>
							<td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900 ">
								Admin dddddddddddd
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
								Admin dddddddddddd
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
								Admin dddddddddddd
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div className="flex justify-center items-center space-x-4">
									<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
										Active
									</span>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div className="flex items-center space-x-4">
									<button layout="link" size="icon" aria-label="Edit">
										<EditIcon className="w-5 h-5" aria-hidden="true" />
									</button>
									<button layout="link" size="icon" aria-label="Delete">
										<TrashIcon className="w-5 h-5" aria-hidden="true" />
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default BuyerHome;
