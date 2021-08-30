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
