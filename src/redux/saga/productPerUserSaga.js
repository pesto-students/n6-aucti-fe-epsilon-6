import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
import * as service from "../services/productService";
import * as actions from "../actions/productActions";
function* loadProductPerUser({ product_id, user_id }) {
	try {
		const product = yield call(service.getProductPerUser, product_id, user_id);
		yield put(actions.productPerUserLoadedAction(product));
	} catch (e) {
		console.log(e);
	}
}

function* watchGetProductPerUser() {
	yield takeEvery(types.GET_PRODUCT_PER_USER, loadProductPerUser);
}

export function* productPerUserSaga() {
	yield all([watchGetProductPerUser()]);
}
