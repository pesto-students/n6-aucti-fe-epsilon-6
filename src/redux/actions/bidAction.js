import * as types from "../types";

export const placeBidAction = (user_id, product_id, bid_price) => {
	return {
		type: types.PLACE_BID,
		user_id,
		product_id,
		bid_price,
	};
};

export const bidPlacedAction = (bidplaced) => {
	return {
		type: types.BID_PLACED,
		bidplaced,
	};
};
