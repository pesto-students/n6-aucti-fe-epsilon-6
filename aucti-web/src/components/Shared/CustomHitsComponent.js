import React from "react";
import { Link } from "react-router-dom";
import { connectStateResults } from "react-instantsearch-dom";
const CustomHitsComponent = ({ props, searchState, searchResults }) => {
	const validQuery = searchState.query?.length >= 3;
	return (
		<>
			{searchResults?.hits.length === 0 && validQuery && (
				<p className="text-xs text-gray-500">
					Aw snap! No search results were found.
				</p>
			)}
			{searchResults?.hits.length > 0 && validQuery && props.show && (
				<ol className="absolute w-auto top-20 border -mt-6 bg-white shadow rounded-lg p-5">
					{searchResults.hits.map((hit) => (
						<Link key={hit.objectID} to={`/home/product/${hit.objectID}`}>
							<li
								className="font-semibold p-1 border-b overflow-ellipsis hover:text-black"
								key={hit.objectID}
							>
								{hit.title}
							</li>
						</Link>
					))}
				</ol>
			)}
		</>
	);
};

export default connectStateResults(CustomHitsComponent);
