import * as types from "../types";
//have an object instead of array
const initialState = {};

export const productPerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_PER_USER_LOADED:
      return action.product;

    default:
      return state;
  }
};