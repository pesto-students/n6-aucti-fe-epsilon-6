import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
import * as service from "../services/productService";
import * as actions from "../actions/productActions";
function* loadProducts() {
  try {
    const products = yield call(service.getProducts);
    yield put(actions.productsLoaded(products));
  } catch (e) {
    console.log(e);
  }
}

function* watchGetProducts() {
  yield takeEvery(types.PRODUCTS_LOADED, loadProducts);
}

export function* productSaga() {
  yield all([watchGetProducts()]);
}