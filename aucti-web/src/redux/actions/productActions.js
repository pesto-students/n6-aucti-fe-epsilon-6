import * as types from "../types";

export const getProducts = () => {
	return {
		type: types.GET_PRODUCTS,
	};
};

export const productsLoaded = (products) => {
	return {
		type: types.PRODUCTS_LOADED,
		products,
	};
};
