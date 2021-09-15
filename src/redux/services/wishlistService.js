import api from "../api";
import { addUserWishlistURL, getUserWishlistURL } from "../apis";

export const getUserWishlist = (user_id) => {
	return api
		.get(getUserWishlistURL + user_id)
		.then((response) => response.data);
};

export const addUserWishlist = (payload) => {
	return api
		.post(addUserWishlistURL, payload)
		.then((response) => response.data);
};
