import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
import * as service from "../services/productService";
import * as actions from "../actions/productActions";
function* loadProducts() {
  try {
    const products = yield call(service.getProducts);
    yield put(actions.productsLoadedAction(products));
  } catch (e) {
    console.log(e);
  }
}

function* watchGetProducts() {
  yield takeEvery(types.GET_PRODUCTS, loadProducts);
}

export function* productsSaga() {
  yield all([watchGetProducts()]);
}
