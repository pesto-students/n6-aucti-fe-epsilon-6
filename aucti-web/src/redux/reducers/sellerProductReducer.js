/* eslint-disable no-case-declarations */
import { SELLER } from '../types';

const initialState = [];

export const sellerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER.SELLER_PRODUCTS_LOADED:
      return action.products;
    case SELLER.PRODUCT_UPDATED:
      const filteredProduts = state.data.filter(
        dataRef => dataRef.product.id !== action.product.product.id,
      );
      console.log(action.product.product.id);
      return {
        data: [action.product, ...filteredProduts],
        length: state.length,
      };
    case SELLER.AUCTION_CANCELLED:
      const filteredProds = state.data.filter(
        dataRef => dataRef.product.id !== action.product.id,
      );

      return {
        data: filteredProds,
        length: state.length - 1,
      };
    case SELLER.BID_UPDATED:
      const filtered = state.data.filter(
        dataRef => dataRef.product.id !== action.bid.product_id,
      );
      return {
        data: filtered,
        length: state.length - 1,
      };
    default:
      return state;
  }
};
