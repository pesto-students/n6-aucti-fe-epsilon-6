import axios from "axios";
import {
	addressesURL,
	bidsURL,
	notificationURL,
	productURL,
	wishlistURL,
} from "../api";

export const getBids = () => {
	return axios.get(bidsURL).then((res) => res.data);
};

export const getBuyerBids = (userId, firstPageIndex, lastPageIndex) => {
	return axios
		.get(bidsURL + "/" + userId + "," + firstPageIndex + "," + lastPageIndex)
		.then((res) => res.data);
};

export const getBuyerHistory = (userId, firstPageIndex, lastPageIndex) => {
	return axios
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
	return axios
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
	return axios.get(wishlistURL + "/" + userId).then((res) => res.data);
};

export const getBuyerInsights = (userId) => {
	return axios.get(bidsURL + "/insights/" + userId).then((res) => res.data);
};

export const OverrideBid = (bid) => {
	return axios.put(bidsURL, { bid }).then((res) => res.data);
};

export const deleteBid = (id) => {
	return axios.delete(bidsURL + "/" + id).then((res) => res.data);
};

export const deleteWishlist = (id) => {
	return axios.delete(wishlistURL + "/" + id).then((res) => res.data);
};

export const getBuyerNotifications = (id) => {
	return axios.get(notificationURL + "/user/" + id).then((res) => res.data);
};

export const updateBuyerNotifications = (notification) => {
	return axios.put(notificationURL, { notification }).then((res) => res.data);
};

export const getBuyerAddress = (id) => {
	return axios.get(addressesURL + "/" + id).then((res) => res.data);
};

export const addBuyerAddress = (address) => {
	return axios.post(addressesURL, { address }).then((res) => res.data);
};

export const deleteBuyerAddress = (id) => {
	return axios.delete(addressesURL + "/" + id).then((res) => res.data);
};

export const makePayments = (token, bid_id, address_id) => {
	return axios
		.post(bidsURL + "/payment", { token, bid_id, address_id })
		.then((res) => res.data);
};

export const getBidProduct = (id) => {
	return axios.get(bidsURL + "/bidPayemnt/" + id).then((res) => res.data);
};

export const confirmReceived = (product_id) => {
	return axios
		.put(productURL + "/receieved", { product_id })
		.then((res) => res.data);
};

export const confirmDispute = (product_id) => {
	return axios
		.put(productURL + "/dispute", { product_id })
		.then((res) => res.data);
};

export const addBid = (product_id, bid_price, user_id) => {
	return axios
		.post(bidsURL, { product_id, bid_price, user_id })
		.then((res) => res.data);
};
