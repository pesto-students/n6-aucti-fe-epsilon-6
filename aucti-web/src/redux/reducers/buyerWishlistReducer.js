/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const buyerWishlistReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BUYER_WISHLIST_LOADED:
			return action.wishlist;
		case BUYER.WISHLIST_DELETED:
			const { id } = action;
			return state.filter((wishlist) => wishlist.id !== id);
		default:
			return state;
	}
};
