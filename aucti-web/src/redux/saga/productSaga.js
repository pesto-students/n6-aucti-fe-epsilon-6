import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
import * as service from "../services/productService";
import * as actions from "../actions/productActions";
function* loadProduct({ product_id}) {
  try {
    const product = yield call(service.getProduct, product_id);
    yield put(actions.productLoadedAction(product));
  } catch (e) {
    console.log(e);
  }
}

function* watchGetProduct() {
  yield takeEvery(types.GET_PRODUCT, loadProduct);
}

export function* productSaga() {
  yield all([watchGetProduct()]);
}
