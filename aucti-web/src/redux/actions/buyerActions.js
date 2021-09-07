import { BUYER } from "../types";

export const loadBidAction = () => {
	return {
		type: BUYER.LOAD_BIDS,
	};
};

export const bidLoadedAction = (bids) => {
	return {
		type: BUYER.BIDS_LOADED,
		bids,
	};
};

export const loadBuyerBidAction = (id, firstPageIndex, lastPageIndex) => {
	return {
		type: BUYER.LOAD_BUYER_BIDS,
		id,
		firstPageIndex,
		lastPageIndex,
	};
};

export const buyerBidLoadedAction = (buyerBids) => {
	return {
		type: BUYER.BUYER_BIDS_LOADED,
		buyerBids,
	};
};

export const loadBuyerWishlistAction = (id) => {
	return {
		type: BUYER.LOAD_BUYER_WISHLIST,
		id,
	};
};

export const buyerWishlistLoadedAction = (wishlist) => {
	return {
		type: BUYER.BUYER_WISHLIST_LOADED,
		wishlist,
	};
};

export const loadBuyerInsightAction = (id) => {
	return {
		type: BUYER.LOAD_BUYER_INSIGHTS,
		id,
	};
};

export const buyerInsightsLoadedAction = (insights) => {
	return {
		type: BUYER.BUYER_INSIGHTS_LOADED,
		insights,
	};
};

export const overrideBidAction = (bid) => {
	return {
		type: BUYER.OVERRIDE_BID,
		bid,
	};
};

export const bidOverridedAction = (buyerBid) => {
	return {
		type: BUYER.BID_OVERRIDED,
		buyerBid,
	};
};

export const deleteBidAction = (id) => {
	return {
		type: BUYER.DELETE_BID,
		id,
	};
};

export const bidDeletedAction = (id) => {
	return {
		type: BUYER.BID_DELETED,
		id,
	};
};

export const deleteWishlistAction = (id) => {
	return {
		type: BUYER.DELETE_WISHLIST,
		id,
	};
};

export const wishlistDeletedAction = (id) => {
	return {
		type: BUYER.WISHLIST_DELETED,
		id,
	};
};

export const loadBuyerHistoryAction = (id, firstPageIndex, lastPageIndex) => {
	return {
		type: BUYER.LOAD_BUYER_HISTORY,
		id,
		firstPageIndex,
		lastPageIndex,
	};
};

export const buyerHistoryLoadedAction = (history) => {
	return {
		type: BUYER.BUYER_HISTORY_LOADED,
		history,
	};
};

export const loadBuyerCompletedAction = (id, firstPageIndex, lastPageIndex) => {
	return {
		type: BUYER.LOAD_BUYER_COMPLETED,
		id,
		firstPageIndex,
		lastPageIndex,
	};
};

export const buyerCompletedLoadedAction = (completed) => {
	return {
		type: BUYER.BUYER_COMPLETED_LOADED,
		completed,
	};
};

export const loadNotificationAction = (id) => {
	return {
		type: BUYER.LOAD_BUYER_NOTIFICATIONS,
		id,
	};
};

export const buyerNotificationLoadedAction = (notifications) => {
	return {
		type: BUYER.BIDS_NOTIFICATIONS_LOADED,
		notifications,
	};
};

export const updateNotificationAction = (notification) => {
	return {
		type: BUYER.UPDATE_BUYER_NOTIFICATIONS,
		notification,
	};
};

export const buyerNotificationUpdatedAction = (notification) => {
	return {
		type: BUYER.BIDS_NOTIFICATIONS_UPDATED,
		notification,
	};
};

export const loadUserAddressAction = (id) => {
	return {
		type: BUYER.LOAD_BUYER_ADDRESS,
		id,
	};
};

export const userAddressLoadedAction = (addresses) => {
	return {
		type: BUYER.BUYER_ADDRESS_LOADED,
		addresses,
	};
};

export const loadBidProductDetailsAction = (id) => {
	return {
		type: BUYER.LOAD_BID_PRODUCT,
		id,
	};
};

export const bidProductDetailsLoadedAction = (product) => {
	return {
		type: BUYER.BID_PRODUCT_LOADED,
		product,
	};
};

export const saveUserAddressAction = (address) => {
	return {
		type: BUYER.SAVE_BUYER_ADDRESS,
		address,
	};
};

export const userAddressSavedAction = (address) => {
	return {
		type: BUYER.BUYER_ADDRESS_SAVED,
		address,
	};
};

export const deleteUserAddressAction = (id) => {
	return {
		type: BUYER.DELETE_BUYER_ADDRESS,
		id,
	};
};

export const userAddressDeletedAction = (id) => {
	return {
		type: BUYER.BUYER_ADDRESS_DELETED,
		id,
	};
};

export const makePaymentAction = (token, bid_id, address_id) => {
	return {
		type: BUYER.ADD_PAYMENT,
		token,
		bid_id,
		address_id,
	};
};

export const payemntAddedAction = (message) => {
	return {
		type: BUYER.PAYMENT_ADDED,
		message,
	};
};

export const confirmRecievedAction = (product_id) => {
	return {
		type: BUYER.CONFIRM_RECEIVED,
		product_id,
	};
};

export const reciveConfirmedAction = (product) => {
	return {
		type: BUYER.RECIEVED_CONFIRMED,
		product,
	};
};

export const reciveConfirmedActionCompleted = (product) => {
	return {
		type: BUYER.RECIEVED_CONFIRMED_COMPLETED,
		product,
	};
};

export const confirmDisputeAction = (product_id) => {
	return {
		type: BUYER.CONFIRM_DISPUTE,
		product_id,
	};
};

export const disputeConfirmedAction = (product) => {
	return {
		type: BUYER.DISPUTE_CONFIRMED,
		product,
	};
};

export const disputeConfirmedActionCompleted = (product) => {
	return {
		type: BUYER.DISPUTE_CONFIRMED_COMPLETED,
		product,
	};
};

export const addBidAction = (product_id, bid_price, user_id) => {
	return {
		type: BUYER.ADD_BID,
		product_id,
		bid_price,
		user_id,
	};
};

export const bidAddedAction = (product) => {
	return {
		type: BUYER.BID_ADDED,
		product,
	};
};
