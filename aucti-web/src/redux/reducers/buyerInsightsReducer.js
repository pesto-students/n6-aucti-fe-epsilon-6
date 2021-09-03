import { BUYER } from "../types";

const initialState = [];

export const buyerInsightsReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BUYER_INSIGHTS_LOADED:
			return action.insights;

		default:
			return state;
	}
};
