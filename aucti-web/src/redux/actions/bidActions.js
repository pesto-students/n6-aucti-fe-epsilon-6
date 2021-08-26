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
