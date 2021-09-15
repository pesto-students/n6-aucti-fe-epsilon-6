import { AUTH } from "../types";

const initialState = null;

export const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH.FILTER_SEARCH:
			return action.filter;
		default:
			return state;
	}
};
