import React from "react";
import { connectHits } from "react-instantsearch-dom";
import ProductCardAlgolia from "../../Shared/ProductCardAlgolia";

const AlgoliaSearch = (props) => {
	const { hits } = props;
	return (
		<>
			{hits.map((hit) => (
				<ProductCardAlgolia key={hit.objectID} bidproduct={hit} />
			))}
		</>
	);
};

export default connectHits(AlgoliaSearch);
