import { SELLER } from "../types";

export const loadSellerAction = (id, firstPageIndex, lastPageIndex) => {
	return {
		type: SELLER.LOAD_SELLER_PRODUCTS,
		id,
		firstPageIndex,
		lastPageIndex,
	};
};

export const sellerProductsLoadedAction = (products) => {
	return {
		type: SELLER.SELLER_PRODUCTS_LOADED,
		products,
	};
};

export const loadSellerInsightAction = (id) => {
	return {
		type: SELLER.LOAD_SELLER_INSIGHTS,
		id,
	};
};

export const sellerInsightsLoadedAction = (insights) => {
	return {
		type: SELLER.SELLER_INSIGHTS_LOADED,
		insights,
	};
};

export const addProductAction = (product, picture) => {
	return {
		type: SELLER.ADD_PRODUCT,
		product,
		picture,
	};
};

export const productAddedAction = (product) => {
	return {
		type: SELLER.PRODUCT_ADDED,
		product,
	};
};

export const updateProductAction = (product, picture) => {
	return {
		type: SELLER.UPDATE_PRODUCT,
		product,
		picture,
	};
};

export const productUpdatedAction = (product) => {
	return {
		type: SELLER.PRODUCT_UPDATED,
		product,
	};
};

export const updateBidAction = (bid_id) => {
	return {
		type: SELLER.UPDATE_BID,
		bid_id,
	};
};

export const bidUpdatedAction = (bid) => {
	return {
		type: SELLER.BID_UPDATED,
		bid,
	};
};

export const cancelAuctionAction = (product_id) => {
	return {
		type: SELLER.CANCEL_AUCTION,
		product_id,
	};
};

export const auctionCancelledAction = (product) => {
	return {
		type: SELLER.AUCTION_CANCELLED,
		product,
	};
};

export const loadBidsWithUsersAction = (
	productId,
	firstPageIndex,
	lastPageIndex
) => {
	return {
		type: SELLER.LOAD_BIDS_WITH_USERS,
		productId,
		firstPageIndex,
		lastPageIndex,
	};
};

export const bidsWithUsersLoadedAction = (bids) => {
	return {
		type: SELLER.BIDS_WITH_USERS_LOADED,
		bids,
	};
};

export const loadSellerHistoryAction = (id, firstPageIndex, lastPageIndex) => {
	return {
		type: SELLER.LOAD_SELLER_HISTORY,
		id,
		firstPageIndex,
		lastPageIndex,
	};
};

export const sellerHistoryLoadedAction = (history) => {
	return {
		type: SELLER.SELLER_HISTORY_LOADED,
		history,
	};
};

export const loadSellerCompletedAction = (
	id,
	firstPageIndex,
	lastPageIndex
) => {
	return {
		type: SELLER.LOAD_SELLER_COMPLETED,
		id,
		firstPageIndex,
		lastPageIndex,
	};
};

export const sellerCompletedLoadedAction = (completed) => {
	return {
		type: SELLER.SELLER_COMPLETED_LOADED,
		completed,
	};
};

export const confirmShipmentAction = (product_id, bank_id) => {
	return {
		type: SELLER.CONFIRM_SHIPMENT,
		product_id,
		bank_id,
	};
};

export const shipmentConfirmedAction = (product) => {
	return {
		type: SELLER.SHIPMENT_CONFIRMED,
		product,
	};
};

export const saveUserBankAccountAction = (account) => {
	return {
		type: SELLER.SAVE_SELLER_BANK_ACCOUNT,
		account,
	};
};

export const userBankAccountSavedAction = (account) => {
	return {
		type: SELLER.SELLER_BANK_ACCOUNT_SAVED,
		account,
	};
};

export const loadUserBankAccountAction = (id) => {
	return {
		type: SELLER.LOAD_USER_BANK_ACCOUNT,
		id,
	};
};

export const userBankAccountLoadedAction = (accounts) => {
	return {
		type: SELLER.USER_BANK_ACCOUNT_LOADED_ACTION,
		accounts,
	};
};

export const deleteUserBankAccountAction = (id) => {
	return {
		type: SELLER.DELETE_USER_BANK_ACCOUNT,
		id,
	};
};

export const userBankAccountDeletedAction = (id) => {
	return {
		type: SELLER.USER_BANK_ACCOUNT_DELETED_ACTION,
		id,
	};
};
