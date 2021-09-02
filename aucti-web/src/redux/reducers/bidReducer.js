import { BUYER } from "../types";

const initialState = [];

export const bidReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BIDS_LOADED:
			return action.bids;

		default:
			return state;
	}
};
