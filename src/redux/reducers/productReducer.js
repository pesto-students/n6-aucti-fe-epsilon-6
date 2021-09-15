import * as types from "../types";
import { BUYER } from "../types";
//have an object instead of array
const initialState = {};

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.PRODUCT_LOADED:
			return action.product;
		case types.PRODUCT_PER_USER_LOADED:
			return action.product;
		case BUYER.BID_ADDED:
			return { ...state, ...action.product };
		case types.WISHLIST_ADDED:
			return { ...state, wishlist: action.added };
		default:
			return state;
	}
};
``;
