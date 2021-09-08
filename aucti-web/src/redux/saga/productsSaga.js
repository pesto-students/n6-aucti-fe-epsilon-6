import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
import * as service from "../services/productService";
import * as actions from "../actions/productActions";

function* loadProducts({ firstPageIndex, lastPageIndex }) {
	try {
		const products = yield call(
			service.getProducts,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.productsLoadedAction(products));
	} catch (e) {
		console.log(e);
	}
}

function* loadLatestProducts({ firstPageIndex, lastPageIndex }) {
	try {
		const products = yield call(
			service.getLatestProducts,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.latestProductsLoadedAction(products));
	} catch (e) {
		console.log(e);
	}
}

function* loadHotProducts({ firstPageIndex, lastPageIndex }) {
	try {
		const products = yield call(
			service.getHotProducts,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.hotProductsLoadedAction(products));
	} catch (e) {
		console.log(e);
	}
}

function* watchGetProducts() {
	yield takeEvery(types.GET_PRODUCTS, loadProducts);
}

function* watchGetLatestProducts() {
	yield takeEvery(types.GET_LATEST_PRODUCTS, loadLatestProducts);
}

function* watchGetHotProducts() {
	yield takeEvery(types.GET_HOT_PRODUCTS, loadHotProducts);
}

export function* productsSaga() {
	yield all([
		watchGetProducts(),
		watchGetLatestProducts(),
		watchGetHotProducts(),
	]);
}
