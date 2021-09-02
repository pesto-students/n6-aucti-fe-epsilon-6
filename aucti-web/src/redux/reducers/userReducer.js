import { AUTH } from "../types";

const initialState = null;

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH.USER_LOGGEDIN:
			return action.user;

		case AUTH.USER_LOGGEDOUT:
			return initialState;

		default:
			return state;
	}
};
