import axios from "axios";
import { addUserWishlistURL, getUserWishlistURL } from "../api";

export const getUserWishlist = (user_id) => {
  return axios
    .get(getUserWishlistURL + user_id)
    .then((response) => response.data);
};

export const addUserWishlist = (payload) => {
  return axios
    .post(addUserWishlistURL, payload)
    .then((response) => response.data);
};

export const deleteUserWishlist = (wishlist_id) => {
  return axios
    .delete(addUserWishlistURL + wishlist_id)
    .then((response) => response.data);
};
