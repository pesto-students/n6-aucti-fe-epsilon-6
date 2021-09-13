/* eslint-disable no-case-declarations */
import { SELLER } from "../types";

const initialState = [];

export const bankAccountsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELLER.USER_BANK_ACCOUNT_LOADED_ACTION:
			return action.accounts;
		case SELLER.SAVE_SELLER_BANK_ACCOUNT:
			return [...state, action.account];
		case SELLER.USER_BANK_ACCOUNT_DELETED_ACTION:
			const { id } = action;
			return state.filter((account) => account.id !== id);
		default:
			return state;
	}
};
