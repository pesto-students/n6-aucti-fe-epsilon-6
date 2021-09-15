import { SELLER } from "../types";

const initialState = [];

export const sellerBidsUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELLER.BIDS_WITH_USERS_LOADED:
			return action.bids;
		default:
			return state;
	}
};
