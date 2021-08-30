/* eslint-disable no-case-declarations */
import { SELLER } from "../types";

const initialState = [];

export const sellerProductReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELLER.SELLER_PRODUCTS_LOADED:
			return action.products;
		case SELLER.PRODUCT_UPDATED:
			console.log(state);
			console.log(state.data);
			const filteredProduts = state.data.filter(
				(dataRef) => dataRef.product.id !== action.product.product.id
			);
			console.log(filteredProduts);
			return {
				data: [action.product, ...filteredProduts],
				length: state.length,
			};
		default:
			return state;
	}
};
