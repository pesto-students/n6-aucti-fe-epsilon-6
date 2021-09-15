import { useMemo, useState } from "react";
import { connectPagination } from "react-instantsearch-dom";

const CustomPagination = ({ currentRefinement, nbPages, refine }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const handleSelect = (page) => {
		refine(page);
		setCurrentPage(page);
	};
	const onNext = () => {
		setCurrentPage(currentPage + 1);
		refine(currentPage + 1);
	};
	const onPrevious = () => {
		setCurrentPage(currentPage - 1);
		refine(currentPage - 1);
	};

	const lastPage = useMemo(() => {
		const pages = new Array(nbPages).fill(null);
		return pages.length;
	}, [nbPages]);

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
				{new Array(nbPages).fill(null).map((_, index) => {
					const page = index + 1;
					// const style = {
					// 	fontWeight: currentRefinement === page ? "bold" : "",
					// };

					// if (pageNumber === DOTS) {
					// 	return <li className="pagination-item dots">&#8230;</li>;
					// }

					return (
						<li
							key={index}
							// className={classnames("pagination-item", {
							// 	selected: pageNumber === currentPage,
							// })}
							// onClick={() => onPageChange(pageNumber)}
						>
							<button
								className={`${
									currentRefinement !== page &&
									"w-10 h-10 text-gray-900 transition-colors duration-150   rounded-full focus:shadow-outline hover:bg-auctiLight"
								} ${
									currentRefinement === page &&
									"w-10 h-10 text-white transition-colors focus:shadow-outline  bg-gray-900 border border-r-0 border-gray-900 duration-150   rounded-full focus:shadow-outline"
								}`}
								onClick={() => handleSelect(page)}
							>
								{page}
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
			</ul>
		</nav>
	);
};

export default connectPagination(CustomPagination);
