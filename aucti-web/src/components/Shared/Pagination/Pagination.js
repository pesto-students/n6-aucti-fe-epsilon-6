import React from "react";
import { usePagination, DOTS } from "./usePagination";

const Pagination = (props) => {
	const {
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		onNext,
		onPrevious,
		handlePageSelect,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange?.length < 2) {
		return <></>;
	}

	// const onNext = () => {
	// 	onPageChange(currentPage + 1);
	// };

	// const onPrevious = () => {
	// 	onPageChange(currentPage - 1);
	// };

	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<nav aria-label="Page navigation">
			<ul className="inline-flex space-x-2">
				<li>
					<button
						className={`flex items-center justify-center w-10 h-10 text-gray-900 transition-colors duration-150 rounded-full focus:shadow-outline ${
							currentPage !== 1 && "hover:bg-auctiLight"
						}`}
						onClick={onPrevious}
						disabled={currentPage === 1}
					>
						<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
							<path
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
								fillRule="evenodd"
							></path>
						</svg>
					</button>
				</li>

				{paginationRange.map((pageNumber) => {
					if (pageNumber === DOTS) {
						return <li className="pagination-item dots">&#8230;</li>;
					}

					return (
						<li
							key={pageNumber}
							// className={classnames("pagination-item", {
							// 	selected: pageNumber === currentPage,
							// })}
							// onClick={() => onPageChange(pageNumber)}
						>
							<button
								className={`${
									pageNumber !== currentPage &&
									"w-10 h-10 text-gray-900 transition-colors duration-150   rounded-full focus:shadow-outline hover:bg-auctiLight"
								} ${
									pageNumber === currentPage &&
									"w-10 h-10 text-white transition-colors focus:shadow-outline  bg-gray-900 border border-r-0 border-gray-900 duration-150   rounded-full focus:shadow-outline"
								}`}
								onClick={() => handlePageSelect(pageNumber)}
							>
								{pageNumber}
							</button>
						</li>
					);
				})}
				<li>
					<button
						className={`flex items-center justify-center w-10 h-10 text-gray-900 transition-colors duration-150 bg-white rounded-full focus:shadow-outline ${
							currentPage !== lastPage && "hover:bg-auctiLight"
						}`}
						onClick={onNext}
						disabled={currentPage === lastPage}
					>
						<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
							<path
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
								fillRule="evenodd"
							></path>
						</svg>
					</button>
				</li>

				{/* <li
					className={classnames("pagination-item", {
						disabled: currentPage === lastPage,
					})}
					onClick={onNext}
				>
					<div className="arrow right" />
				</li> */}
			</ul>
		</nav>
	);
};

export default Pagination;
