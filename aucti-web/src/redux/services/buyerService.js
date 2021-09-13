import api from "../api";
import {
	addressesURL,
	bidsURL,
	notificationURL,
	productURL,
	wishlistURL,
} from "../apis";

export const getBids = () => {
	return api.get(bidsURL).then((res) => res.data);
};

export const getBuyerBids = (userId, firstPageIndex, lastPageIndex) => {
	return api
		.get(bidsURL + "/" + userId + "," + firstPageIndex + "," + lastPageIndex)
		.then((res) => res.data);
};

export const getBuyerHistory = (userId, firstPageIndex, lastPageIndex) => {
	return api
		.get(
			bidsURL +
				"/history/" +
				userId +
				"," +
				firstPageIndex +
				"," +
				lastPageIndex
		)
		.then((res) => res.data);
};

export const getBuyerCompleted = (userId, firstPageIndex, lastPageIndex) => {
	return api
		.get(
			bidsURL +
				"/completed/" +
				userId +
				"," +
				firstPageIndex +
				"," +
				lastPageIndex
		)
		.then((res) => res.data);
};

export const getBuyerWishlist = (userId) => {
	return api.get(wishlistURL + "/" + userId).then((res) => res.data);
};

export const getBuyerInsights = (userId) => {
	return api.get(bidsURL + "/insights/" + userId).then((res) => res.data);
};

export const OverrideBid = (bid) => {
	return api.put(bidsURL, { bid }).then((res) => res.data);
};

export const deleteBid = (id) => {
	return api.delete(bidsURL + "/" + id).then((res) => res.data);
};

export const deleteWishlist = (id) => {
	return api.delete(wishlistURL + "/" + id).then((res) => res.data);
};

export const getBuyerNotifications = (id) => {
	return api.get(notificationURL + "/user/" + id).then((res) => res.data);
};

export const updateBuyerNotifications = (notification) => {
	return api.put(notificationURL, { notification }).then((res) => res.data);
};

export const getBuyerAddress = (id) => {
	return api.get(addressesURL + "/" + id).then((res) => res.data);
};

export const addBuyerAddress = (address) => {
	return api.post(addressesURL, { address }).then((res) => res.data);
};

export const deleteBuyerAddress = (id) => {
	return api.delete(addressesURL + "/" + id).then((res) => res.data);
};

export const makePayments = (token, bid_id, address_id) => {
	return api
		.post(bidsURL + "/payment", { token, bid_id, address_id })
		.then((res) => res.data);
};

export const getBidProduct = (id) => {
	return api.get(bidsURL + "/bidPayemnt/" + id).then((res) => res.data);
};

export const confirmReceived = (product_id) => {
	return api
		.put(productURL + "/receieved", { product_id })
		.then((res) => res.data);
};

export const confirmDispute = (product_id) => {
	return api
		.put(productURL + "/dispute", { product_id })
		.then((res) => res.data);
};

export const addBid = (product_id, bid_price, user_id) => {
	return api
		.post(bidsURL, { product_id, bid_price, user_id })
		.then((res) => res.data);
};
