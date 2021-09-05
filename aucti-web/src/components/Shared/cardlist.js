import React from "react";

import Loader from "./Loader";

import ProductCard from "./ProductCard";
const Cardlist = (props) => {
	const { productlist } = props;
	if (!productlist) {
		<Loader />;
	}
	return (
		<>
			{productlist.map((item) => {
				return <ProductCard key={item.id} bidproduct={item}></ProductCard>;
			})}
		</>
	);
};

export default Cardlist;
