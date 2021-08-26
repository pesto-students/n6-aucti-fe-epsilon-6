import { BID } from "../types";

export const loadBidAction = () => {
	return {
		type: BID.LOAD_BIDS,
	};
};

export const bidLoadedAction = (bids) => {
	return {
		type: BID.BIDS_LOADED,
		bids,
	};
};

export const loadBuyerBidAction = (id, currentPage, itemsPerPage) => {
	return {
		type: BID.LOAD_BUYER_BIDS,
		id,
		currentPage,
		itemsPerPage,
	};
};

export const buyerBidLoadedAction = (buyerBids) => {
	return {
		type: BID.BUYER_BIDS_LOADED,
		buyerBids,
	};
};

export const overrideBidAction = (bid) => {
	return {
		type: BID.OVERRIDE_BID,
		bid,
	};
};

export const bidOverridedAction = (buyerBid) => {
	return {
		type: BID.BID_OVERRIDED,
		buyerBid,
	};
};

export const deleteBidAction = (id) => {
	return {
		type: BID.DELETE_BID,
		id,
	};
};

export const bidDeletedAction = (id) => {
	return {
		type: BID.BID_DELETED,
		id,
	};
};
