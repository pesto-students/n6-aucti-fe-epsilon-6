import * as types from "../types";

export const getProductPerUserAction = (product_id, user_id) => {
  return {
    type: types.GET_PRODUCT_PER_USER,
    product_id,
    user_id,
  };
};

export const productPerUserLoadedAction = (product) => {
  return {
    type: types.PRODUCT_PER_USER_LOADED,
    product,
  };
};

export const getProductAction = (product_id) => {
  return {
    type: types.GET_PRODUCT,
    product_id,
  };
};

export const productLoadedAction = (product) => {
  return {
    type: types.PRODUCT_LOADED,
    product,
  };
};

export const getProductsAction = (firstPageIndex, lastPageIndex) => {
  return {
    type: types.GET_PRODUCTS,
    firstPageIndex,
    lastPageIndex,
  };
};

export const productsLoadedAction = (products) => {
  return {
    type: types.PRODUCTS_LOADED,
    products,
  };
};

export const getLatestProductsAction = (firstPageIndex, lastPageIndex) => {
  return {
    type: types.GET_LATEST_PRODUCTS,
    firstPageIndex,
    lastPageIndex,
  };
};

export const latestProductsLoadedAction = (products) => {
  return {
    type: types.LATEST_PRODUCTS_LOADED,
    products,
  };
};

export const getHotProductsAction = (firstPageIndex, lastPageIndex) => {
  return {
    type: types.GET_HOT_PRODUCTS,
    firstPageIndex,
    lastPageIndex,
  };
};

export const hotProductsLoadedAction = (products) => {
  return {
    type: types.HOT_PRODUCTS_LOADED,
    products,
  };
};

export const getProductsPerUserAction = (product_id, user_id) => {
  return {
    type: types.GET_PRODUCT_PER_USER,
    product_id,
    user_id,
  };
};
