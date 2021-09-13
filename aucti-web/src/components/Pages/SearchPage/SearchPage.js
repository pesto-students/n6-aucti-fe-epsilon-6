import React, { useEffect } from "react";

import "./Search.css";
import { Configure } from "react-instantsearch-dom";

import AlgoliaSearch from "./AlgoliaSearch";
import { connect } from "react-redux";
import { showpriceRangeAction } from "../../../redux/actions/userActions";
import CustomSortBy from "../../Shared/CustomSortBy";
import CustomPagination from "../../Shared/CustomPagination";

const SearchPage = (props) => {
	const { searchFilter } = props;

	useEffect(() => {
		props.dispatch(showpriceRangeAction(true));
		return () => {
			props.dispatch(showpriceRangeAction(true));
		};
	}, []);

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
			<div className="flex justify-end p-4">
				<CustomSortBy
					defaultRefinement="aucti_products"
					items={[
						{ value: "aucti_products", label: "Featured" },
						{ value: "instant_search_price_asc", label: "Price asc." },
						{ value: "instant_search_price_desc", label: "Price desc." },
					]}
				/>
			</div>

			<div className="grid xl:px-6 xs:px-0  items-start xl:grid-cols-3 md:grid-cols-2 gap-1  xs:grid-cols-1">
				<AlgoliaSearch />
			</div>
			<div className="flex justify-end p-4">
				{" "}
				<CustomPagination
				// translations={{
				// 	previous: "‹",
				// 	next: "›",
				// 	first: "«",
				// 	last: "»",
				// 	page(currentRefinement) {
				// 		return currentRefinement;
				// 	},
				// 	ariaPrevious: "Previous page",
				// 	ariaNext: "Next page",
				// 	ariaFirst: "First page",
				// 	ariaLast: "Last page",
				// 	ariaPage(currentRefinement) {
				// 		return `Page ${currentRefinement}`;
				// 	},
				// }}
				/>
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
