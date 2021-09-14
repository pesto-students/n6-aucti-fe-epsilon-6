import * as types from '../types';
//have an object instead of array
const initialState = [];

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCTS_LOADED:
      return action.products;
    default:
      return state;
  }
};
