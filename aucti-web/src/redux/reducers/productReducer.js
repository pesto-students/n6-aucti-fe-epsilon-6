import * as types from "../types";
import { BUYER } from "../types";
//have an object instead of array
const initialState = {};

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.PRODUCT_LOADED:
			return action.product;
		case BUYER.BID_ADDED:
			return action.product;
		default:
			return state;
	}
};
