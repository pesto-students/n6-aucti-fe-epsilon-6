import * as types from "../types";

export const getProductsAction = () => {
  return {
    type: types.GET_PRODUCTS,
  };
};

export const productsLoadedAction = (products) => {
  return {
    type: types.PRODUCTS_LOADED,
    products,
  };
};
