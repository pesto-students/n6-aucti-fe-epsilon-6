import * as types from "../types";
//have an object instead of array
const initialState = {};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_LOADED:
      return action.product;

    default:
      return state;
  }
};