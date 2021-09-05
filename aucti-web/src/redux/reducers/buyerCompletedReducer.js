/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const buyerCompletedReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BUYER_COMPLETED_LOADED:
			return action.completed;
		case BUYER.RECIEVED_CONFIRMED_COMPLETED:
			return {
				data: [action.product, ...state.data],
				length: state.length + 1,
			};
		case BUYER.DISPUTE_CONFIRMED_COMPLETED:
			return {
				data: [action.product, ...state.data],
				length: state.length + 1,
			};
		default:
			return state;
	}
};
