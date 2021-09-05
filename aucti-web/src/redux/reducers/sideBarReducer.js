import { AUTH } from "../types";

const initialState = false;

export const sideBarReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH.TOGGLE_SIDEBAR:
			return !state;
		default:
			return state;
	}
};
