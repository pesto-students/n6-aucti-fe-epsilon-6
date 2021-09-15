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

function* updateBid({ bid_id }) {
	try {
		const bid = yield call(service.updateBid, bid_id);

		yield put(actions.bidUpdatedAction(bid));
		yield put(
			alerts.setAlertAction({
				text: "Highest Bidder selected Successfully!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (error) {
		console.log(error);
		yield put(
			alerts.setAlertAction({
				text: "Highest Bidder not selected!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

function* loadSellerHistory({ id, firstPageIndex, lastPageIndex }) {
	try {
		const history = yield call(
			service.getSellerHistory,
			id,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.sellerHistoryLoadedAction(history));
	} catch (e) {
		console.log(e);
	}
}

function* loadSellerCompleted({ id, firstPageIndex, lastPageIndex }) {
	try {
		const completed = yield call(
			service.getSellerCompleted,
			id,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.sellerCompletedLoadedAction(completed));
	} catch (e) {
		console.log(e);
	}
}

function* confirmShipment({ product_id, bank_id }) {
	try {
		const product = yield call(service.confirmShipment, product_id, bank_id);
		console.log(product);
		yield put(actions.shipmentConfirmedAction(product));
		yield put(
			alerts.setAlertAction({
				text: "Product shipment confirmed to the buyer!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (error) {
		console.log(error);
		yield put(
			alerts.setAlertAction({
				text: "Product shipment not confirmed to the buyer!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

function* cancelAuction({ product_id }) {
	try {
		const product = yield call(service.cancelAuction, product_id);
		yield put(actions.auctionCancelledAction(product));
		yield put(
			alerts.setAlertAction({
				text: "Product successfully cancelled!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (error) {
		console.log(error);
		yield put(
			alerts.setAlertAction({
				text: "Product not cancelled!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

function* saveSellerBankAccount({ account }) {
	try {
		const accountData = yield call(service.saveBankAccount, account);
		yield put(actions.userBankAccountSavedAction(accountData));
		yield put(
			alerts.setAlertAction({
				text: "Bank account details saved!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (e) {
		console.log(e);
		yield put(
			alerts.setAlertAction({
				text: "Bank account detail cannot be save at the momemnt!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}
function* loadUserBankAccount({ id }) {
	try {
		const accounts = yield call(service.getSellerBankAccount, id);
		yield put(actions.userBankAccountLoadedAction(accounts));
	} catch (e) {
		console.log(e);
	}
}

function* deleteBankAccount({ id }) {
	try {
		yield call(service.deleteSellerBankAccount, id);
		yield put(actions.userBankAccountDeletedAction(id));
		yield put(
			alerts.setAlertAction({
				text: "Bank account details deleted sucessfully!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (e) {
		console.log(e);
		yield put(
			alerts.setAlertAction({
				text: "Bank account details cannot be deleted at the moment",
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

function* watchUpdatebid() {
	yield takeEvery(SELLER.UPDATE_BID, updateBid);
}

function* watchLoadSellerHistory() {
	yield takeEvery(SELLER.LOAD_SELLER_HISTORY, loadSellerHistory);
}

function* watchLoadSellerCompleted() {
	yield takeEvery(SELLER.LOAD_SELLER_COMPLETED, loadSellerCompleted);
}

function* watchConFirmShipmemnt() {
	yield takeEvery(SELLER.CONFIRM_SHIPMENT, confirmShipment);
}

function* watchCancelAcution() {
	yield takeEvery(SELLER.CANCEL_AUCTION, cancelAuction);
}

function* watchSaveSellerBankAccount() {
	yield takeEvery(SELLER.SAVE_SELLER_BANK_ACCOUNT, saveSellerBankAccount);
}

function* watchLoadUserBankAccounts() {
	yield takeEvery(SELLER.LOAD_USER_BANK_ACCOUNT, loadUserBankAccount);
}

function* watchDeleteUserBankAccount() {
	yield takeEvery(SELLER.DELETE_USER_BANK_ACCOUNT, deleteBankAccount);
}

export function* sellerSaga() {
	yield all([
		watchLoadSellerProducts(),
		watchLoadSellerInsights(),
		watchAddProduct(),
		watchUpdateProduct(),
		watchLoadBidsWithUser(),
		watchUpdatebid(),
		watchLoadSellerHistory(),
		watchConFirmShipmemnt(),
		watchLoadSellerCompleted(),
		watchCancelAcution(),
		watchSaveSellerBankAccount(),
		watchLoadUserBankAccounts(),
		watchDeleteUserBankAccount(),
	]);
}
