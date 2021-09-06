import * as types from "../types";

export const getProductAction = (product_id) => {
	return {
		type: types.GET_PRODUCT,
		product_id,
	};
};

export const productLoadedAction = (product) => {
	return {
		type: types.PRODUCT_LOADED,
		product,
	};
};

export const getProductsAction = () => {
	return {
		type: types.GET_PRODUCTS,
	};
};

export const productsLoadedAction = (products) => {
	return {
		type: types.PRODUCTS_LOADED,
		products,
	};
};
