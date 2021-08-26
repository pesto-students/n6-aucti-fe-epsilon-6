/* eslint-disable no-case-declarations */
import { BID } from "../types";

const initialState = [];

export const buyerBidReducer = (state = initialState, action) => {
	switch (action.type) {
		case BID.BUYER_BIDS_LOADED:
			return action.buyerBids;
		case BID.BID_OVERRIDED:
			const filter = state.filter((bid) => bid.id !== action.buyerBid.id);
			return [action.buyerBid, ...filter];
		case BID.BID_DELETED:
			const { id } = action;
			return state.filter((bid) => bid.id !== id);
		default:
			return state;
	}
};
