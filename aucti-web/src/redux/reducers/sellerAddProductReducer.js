/* eslint-disable no-case-declarations */
import { SELLER } from "../types";

const initialState = [];

export const sellerAddProductReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELLER.ADD_PRODUCT:
			return action.product;
		default:
			return state;
	}
};
