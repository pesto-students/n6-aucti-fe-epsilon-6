import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
	getHotProductsAction,
	getLatestProductsAction,
} from "../../../redux/actions/productActions";

import Pagination from "../../Shared/Pagination/Pagination";

import ProductCard from "../../Shared/ProductCard";
import SpecialPageSkelton from "./SpecialPageSkelton";
let PageSize = 6;
function SpeacialPage(props) {
	const { specialProducts } = props;

	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [productsFiltered, setProductsFiltered] = useState(
		specialProducts.data
	);

	useEffect(() => {
		const { firstPageIndex, lastPageIndex } = currentTableData;
		const category = props.match.params.category;
		if (category === "hot_auctions") {
			props.getHotProducts(firstPageIndex, lastPageIndex);
		} else if (category === "latest") {
			props.getLatestProducts(firstPageIndex, lastPageIndex);
		} else {
			props.getLatestProducts(firstPageIndex, lastPageIndex);
		}
	}, [currentPage, props.match.params.category]);

	useEffect(() => {
		if (specialProducts && specialProducts?.data !== productsFiltered) {
			setProductsFiltered(specialProducts.data);
			setLoading(false);
		}
	}, [specialProducts]);

	const onNext = () => {
		setLoading(true);
		setCurrentPage(currentPage + 1);
	};
	const onPrevious = () => {
		setLoading(true);
		setCurrentPage(currentPage - 1);
	};

	const handlePageSelect = (page) => {
		setLoading(true);
		setCurrentPage(page);
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return { firstPageIndex, lastPageIndex };
	}, [currentPage]);

	if (loading) {
		return <SpecialPageSkelton />;
	}
	return (
		<>
			<div
				id="main"
				className="grid items-start xl:grid-cols-3 md:grid-cols-2 gap-1  xs:grid-cols-1"
			>
				{productsFiltered !== null &&
					productsFiltered.map((item) => {
						return <ProductCard key={item.id} bidproduct={item}></ProductCard>;
					})}
			</div>
			<div className="grid justify-items-end p-4">
				<Pagination
					currentPage={currentPage}
					totalCount={specialProducts.length}
					pageSize={PageSize}
					onPageChange={(page) => setCurrentPage(page)}
					onNext={onNext}
					onPrevious={onPrevious}
					handlePageSelect={handlePageSelect}
				/>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		specialProducts: state.specialProducts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getLatestProducts: (firstPageIndex, lastPageIndex) =>
			dispatch(getLatestProductsAction(firstPageIndex, lastPageIndex)),
		getHotProducts: (firstPageIndex, lastPageIndex) =>
			dispatch(getHotProductsAction(firstPageIndex, lastPageIndex)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeacialPage);
