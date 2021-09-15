import api from "../api";
import { placeBidURL } from "../apis";
export const placeBid = (payload) => {
	return api.post(placeBidURL, payload).then((response) => response.data);
};

export const getUserBids = (id) => {
	return api.get(placeBidURL + "user/" + id).then((response) => response.data);
};

export const updateUserBids = (payload) => {
	console.log(payload);
	return api.put(placeBidURL, payload).then((response) => response.data);
};
