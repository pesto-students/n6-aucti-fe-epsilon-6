import * as types from "../types";
export const addWishlistAction = (user_id, product_id) => {
  return {
    type: types.ADD_WISHLIST,
    user_id,
    product_id,
  };
};

export const wishlistAddedAction = (added) => {
  return {
    type: types.WISHLIST_ADDED,
    added,
  };
};
