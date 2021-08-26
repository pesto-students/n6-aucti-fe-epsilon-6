import { BID } from "../types";

const initialState = [];

export const bidReducer = (state = initialState, action) => {
	switch (action.type) {
		case BID.BIDS_LOADED:
			return action.bids;

		default:
			return state;
	}
};
