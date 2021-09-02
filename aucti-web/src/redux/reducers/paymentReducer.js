/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const paymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.PAYMENT_ADDED:
			return action.message;
		default:
			return state;
	}
};
