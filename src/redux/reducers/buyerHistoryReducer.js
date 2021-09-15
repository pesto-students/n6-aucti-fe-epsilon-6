/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const buyerHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BUYER_HISTORY_LOADED:
			return action.history;
		case BUYER.RECIEVED_CONFIRMED:
			const filteredProduts = state.data.filter(
				(dataRef) => dataRef.id !== action.product.id
			);
			return {
				data: filteredProduts,
				length: state.length - 1,
			};
		case BUYER.DISPUTE_CONFIRMED:
			const filteredProdutsRef = state.data.filter(
				(dataRef) => dataRef.id !== action.product.id
			);
			return {
				data: filteredProdutsRef,
				length: state.length - 1,
			};
		default:
			return state;
	}
};
