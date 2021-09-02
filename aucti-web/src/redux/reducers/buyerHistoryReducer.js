/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const buyerHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BUYER_HISTORY_LOADED:
			return action.history;

		default:
			return state;
	}
};
