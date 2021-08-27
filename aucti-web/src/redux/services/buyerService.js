import axios from "axios";
import { addressesURL, bidsURL, notificationURL, wishlistURL } from "../api";

export const getBids = () => {
	return axios.get(bidsURL).then((res) => res.data);
};

export const getBuyerBids = (userId) => {
	return axios.get(bidsURL + "/" + userId).then((res) => res.data);
};

export const getBuyerHistory = (userId) => {
	return axios.get(bidsURL + "/history/" + userId).then((res) => res.data);
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
