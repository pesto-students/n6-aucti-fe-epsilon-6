/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const bidProductReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BID_PRODUCT_LOADED:
			return action.product;

		default:
			return state;
	}
};
