import React from "react";

import "./Search.css";
import {
	Configure,
	connectHits,
	Hits,
	Pagination,
} from "react-instantsearch-dom";
import ProductCard from "../../Shared/ProductCard";
import AlgoliaSearch from "./AlgoliaSearch";
import { connect } from "react-redux";

const SearchPage = (props) => {
	const { searchFilter } = props;
	return (
		<>
			{searchFilter !== null && (
				<Configure
					filters={`product_category:${searchFilter}`}
					// hitsPerPage={4}
					analytics={false}
					// enablePersonalization={true}
					distinct
				/>
			)}

			<div className="grid xl:px-6 xs:px-0  items-start xl:grid-cols-3 md:grid-cols-2 gap-1  xs:grid-cols-1">
				<AlgoliaSearch />
			</div>
			<div className="flex justify-end p-4">
				{" "}
				<Pagination />
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		product: state.productReducer,
		searchFilter: state.searchFilter,
	};
};

export default connect(mapStateToProps)(SearchPage);
