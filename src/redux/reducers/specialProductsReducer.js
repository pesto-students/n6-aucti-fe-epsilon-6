import * as types from "../types";

const initialState = [];

export const specialProductsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LATEST_PRODUCTS_LOADED:
			return action.products;
		case types.HOT_PRODUCTS_LOADED:
			return action.products;
		default:
			return state;
	}
};
