import { AUTH } from "../types";

const initialState = false;

export const priceRangeReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH.SHOW_PRICE_RANGE:
			return !state;
		default:
			return state;
	}
};
