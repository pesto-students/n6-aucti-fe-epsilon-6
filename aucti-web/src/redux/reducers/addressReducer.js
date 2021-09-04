/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const addressReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BUYER_ADDRESS_LOADED:
			return action.addresses;
		case BUYER.BUYER_ADDRESS_SAVED:
			return [...state, action.address];
		case BUYER.BUYER_ADDRESS_DELETED:
			const { id } = action;
			return state.filter((address) => address.id !== id);
		default:
			return state;
	}
};
