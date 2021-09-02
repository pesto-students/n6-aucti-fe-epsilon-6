/* eslint-disable no-case-declarations */
import { SELLER } from "../types";

const initialState = [];

export const sellerCompletedReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELLER.SELLER_COMPLETED_LOADED:
			return action.completed;
		default:
			return state;
	}
};
