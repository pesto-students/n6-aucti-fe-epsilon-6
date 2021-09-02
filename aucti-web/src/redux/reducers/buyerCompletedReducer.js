/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const buyerCompletedReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BUYER_COMPLETED_LOADED:
			return action.completed;

		default:
			return state;
	}
};
