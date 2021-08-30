import { SELLER } from "../types";

const initialState = [];

export const sellerInsightsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELLER.SELLER_INSIGHTS_LOADED:
			return action.insights;
		default:
			return state;
	}
};
