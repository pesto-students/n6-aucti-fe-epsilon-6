import React from "react";
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
				<ol className="absolute top-20 border -mt-6 bg-white shadow rounded-lg p-5">
					{searchResults.hits.map((hit) => (
						<button
							className="w-full font-semibold text-left p-1 border-b overflow-ellipsis hover:text-black"
							key={hit.objectID}
							onClick={() => props.handleClick(hit.objectID)}
						>
							<li key={hit.objectID}>{hit.title}</li>
						</button>
					))}
				</ol>
			)}
		</>
	);
};

export default connectStateResults(CustomHitsComponent);
