/* eslint-disable no-case-declarations */
import { SELLER } from "../types";

const initialState = [];

export const sellerHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELLER.SELLER_HISTORY_LOADED:
			return action.history;
		case SELLER.SHIPMENT_CONFIRMED:
			const filteredProduts = state.data.filter(
				(dataRef) => dataRef.id !== action.product.id
			);
			return {
				data: [action.product, ...filteredProduts],
				length: state.length,
			};
		default:
			return state;
	}
};
