import { BID } from "../types";

const initialState = [];

export const buyerBidReducer = (state = initialState, action) => {
	switch (action.type) {
		case BID.BUYER_BIDS_LOADED:
			return action.buyerBids;

		default:
			return state;
	}
};
