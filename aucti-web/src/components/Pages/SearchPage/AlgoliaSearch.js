import React from "react";
import { connectHits, RefinementList } from "react-instantsearch-dom";
import ProductCard from "../../Shared/ProductCard";
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
