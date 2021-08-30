import { takeEvery, call, put, all } from "redux-saga/effects";
import history from "../../routes/history";
import * as service from "../services/sellerService";
import * as actions from "../actions/sellerActions";
import * as alerts from "../actions/alertActions";
import { SELLER } from "../types";

//Worker Sagas

function* loadSellerProducts({ id, firstPageIndex, lastPageIndex }) {
	try {
		const products = yield call(
			service.getSellerProducts,
			id,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.sellerProductsLoadedAction(products));
	} catch (e) {
		console.log(e);
	}
}

function* loadSellerInsights({ id }) {
	try {
		const insights = yield call(service.getSellerInsights, id);
		yield put(actions.sellerInsightsLoadedAction(insights));
	} catch (e) {
		console.log(e);
	}
}

function* loadsBidsWithUsers({ productId, firstPageIndex, lastPageIndex }) {
	try {
		const bidsRec = yield call(
			service.loadBidsWithUsers,
			productId,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.bidsWithUsersLoadedAction(bidsRec));
	} catch (e) {
		console.log(e);
	}
}

function* addProduct({ product, picture }) {
	try {
		console.log(product);
		const picURL = yield call(service.uploadPicture, picture);
		const productRec = yield call(service.addProduct, {
			...product,
			product_picture: picURL,
			picture: picture.name,
		});

		yield put(actions.productAddedAction(productRec));
		yield put(
			alerts.setAlertAction({
				text: "Product Added Successfully!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
		history.push("/seller");
	} catch (e) {
		console.log(e);
		yield put(
			alerts.setAlertAction({
				text: e.msg,
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

function* updateProduct({ product, picture }) {
	try {
		let productRec;
		if (picture !== null && picture !== "") {
			const picURL = yield call(
				service.deleteAndUploadPicture,
				product.picture,
				picture
			);
			productRec = yield call(service.updateProduct, {
				...product,
				product_picture: picURL,
				picture: picture.name,
			});
		} else {
			productRec = yield call(service.updateProduct, product);
		}

		yield put(actions.productUpdatedAction(productRec));
		yield put(
			alerts.setAlertAction({
				text: "Product updated Successfully!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (error) {
		console.log(error);
		yield put(
			alerts.setAlertAction({
				text: "Product not updated!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

//Watcher Sagas
function* watchLoadSellerProducts() {
	yield takeEvery(SELLER.LOAD_SELLER_PRODUCTS, loadSellerProducts);
}

function* watchLoadSellerInsights() {
	yield takeEvery(SELLER.LOAD_SELLER_INSIGHTS, loadSellerInsights);
}

function* watchAddProduct() {
	yield takeEvery(SELLER.ADD_PRODUCT, addProduct);
}

function* watchUpdateProduct() {
	yield takeEvery(SELLER.UPDATE_PRODUCT, updateProduct);
}

function* watchLoadBidsWithUser() {
	yield takeEvery(SELLER.LOAD_BIDS_WITH_USERS, loadsBidsWithUsers);
}

export function* sellerSaga() {
	yield all([
		watchLoadSellerProducts(),
		watchLoadSellerInsights(),
		watchAddProduct(),
		watchUpdateProduct(),
		watchLoadBidsWithUser(),
	]);
}
