import { takeEvery, call, put, all } from "redux-saga/effects";

import * as service from "../services/buyerService";
import * as actions from "../actions/buyerActions";
import * as alerts from "../actions/alertActions";
import { BUYER } from "../types";

//Worker Sagas
function* loadBids() {
	try {
		const bids = yield call(service.getBids);
		yield put(actions.bidLoadedAction(bids));
	} catch (e) {
		console.log(e);
	}
}
function* loadBuyerBids({ id, firstPageIndex, lastPageIndex }) {
	try {
		const BuyerBids = yield call(
			service.getBuyerBids,
			id,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.buyerBidLoadedAction(BuyerBids));
	} catch (e) {
		console.log(e);
	}
}

function* loadBuyerHistory({ id, firstPageIndex, lastPageIndex }) {
	try {
		const history = yield call(
			service.getBuyerHistory,
			id,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.buyerHistoryLoadedAction(history));
	} catch (e) {
		console.log(e);
	}
}

function* loadBuyerCompleted({ id, firstPageIndex, lastPageIndex }) {
	try {
		const completed = yield call(
			service.getBuyerCompleted,
			id,
			firstPageIndex,
			lastPageIndex
		);
		yield put(actions.buyerCompletedLoadedAction(completed));
	} catch (e) {
		console.log(e);
	}
}

function* loadBuyerWishlist({ id }) {
	try {
		const wishList = yield call(service.getBuyerWishlist, id);
		yield put(actions.buyerWishlistLoadedAction(wishList));
	} catch (e) {
		console.log(e);
	}
}

function* loadInsights({ id }) {
	try {
		const BuyerBids = yield call(service.getBuyerInsights, id);
		yield put(actions.buyerInsightsLoadedAction(BuyerBids));
	} catch (e) {
		console.log(e);
	}
}

function* loadOverrideBid({ bid }) {
	try {
		const overridedBid = yield call(service.OverrideBid, bid);
		yield put(actions.bidOverridedAction(overridedBid));
		yield put(
			alerts.setAlertAction({
				text: "Bid Updated!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
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

function* loadDeleteBid({ id }) {
	try {
		yield call(service.deleteBid, id);
		yield put(actions.bidDeletedAction(id));
		yield put(
			alerts.setAlertAction({
				text: "Bid Deleted successfully",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
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

function* loadDeleteWishlist({ id }) {
	try {
		yield call(service.deleteWishlist, id);
		yield put(actions.wishlistDeletedAction(id));
		yield put(
			alerts.setAlertAction({
				text: "Bid Deleted successfully",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
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

function* loadBuyerNotifications({ id }) {
	try {
		const notifications = yield call(service.getBuyerNotifications, id);
		yield put(actions.buyerNotificationLoadedAction(notifications));
	} catch (e) {
		console.log(e);
	}
}

function* updateBuyerNotifications({ notification }) {
	try {
		const notificationUpdated = yield call(
			service.updateBuyerNotifications,
			notification
		);
		yield put(actions.buyerNotificationUpdatedAction(notificationUpdated));
		yield put(
			alerts.setAlertAction({
				text: "Notification updated!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
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

function* loadBuyerAddress({ id }) {
	try {
		const addresses = yield call(service.getBuyerAddress, id);
		yield put(actions.userAddressLoadedAction(addresses));
	} catch (e) {
		console.log(e);
	}
}

function* loadBidProduct({ id }) {
	try {
		const product = yield call(service.getBidProduct, id);
		yield put(actions.bidProductDetailsLoadedAction(product));
	} catch (e) {
		console.log(e);
	}
}

function* saveBuyerAddress({ address }) {
	try {
		const addressData = yield call(service.addBuyerAddress, address);
		yield put(actions.userAddressSavedAction(addressData));
		yield put(
			alerts.setAlertAction({
				text: "Address saved!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (e) {
		console.log(e);
		yield put(
			alerts.setAlertAction({
				text: "Address cannot be save at the momemnt!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

function* deleteBuyerAddress({ id }) {
	try {
		yield call(service.deleteBuyerAddress, id);
		yield put(actions.userAddressDeletedAction(id));
		yield put(
			alerts.setAlertAction({
				text: "Address deleted sucessfully!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
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

function* makePayment({ token, bid_id, address_id }) {
	try {
		const message = yield call(service.makePayments, token, bid_id, address_id);
		yield put(actions.payemntAddedAction(message));
		yield put(
			alerts.setAlertAction({
				text: message.msg,
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (e) {
		console.log(e);
		yield put(
			alerts.setAlertAction({
				text: "Payment Failed",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

function* confirmReceive({ product_id }) {
	try {
		const product = yield call(service.confirmReceived, product_id);
		yield put(actions.reciveConfirmedAction(product));
		yield put(actions.reciveConfirmedActionCompleted(product));
		yield put(
			alerts.setAlertAction({
				text: "Product received confirmed to the seller!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (error) {
		console.log(error);
		yield put(
			alerts.setAlertAction({
				text: "Product received not confirmed to the seller!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

function* confirmDispute({ product_id }) {
	try {
		const product = yield call(service.confirmDispute, product_id);
		console.log(product);
		yield put(actions.disputeConfirmedAction(product));
		yield put(actions.disputeConfirmedActionCompleted(product));
		yield put(
			alerts.setAlertAction({
				text: "Successfully raised a dispute!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (error) {
		console.log(error);
		yield put(
			alerts.setAlertAction({
				text: "Dispute not raised!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

function* addBid({ product_id, bid_price, user_id }) {
	try {
		const product = yield call(service.addBid, product_id, bid_price, user_id);
		yield put(actions.bidAddedAction(product));
		yield put(
			alerts.setAlertAction({
				text: "Your Bid Successfully Added!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
	} catch (error) {
		console.log(error);
		yield put(
			alerts.setAlertAction({
				text: "We couldn't add your bid at the moment!",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
}

//Watcher Sagas
function* watchLoadBids() {
	yield takeEvery(BUYER.LOAD_BIDS, loadBids);
}

function* watchLoadBuyerBids() {
	yield takeEvery(BUYER.LOAD_BUYER_BIDS, loadBuyerBids);
}

function* watchLoadBuyerWishlist() {
	yield takeEvery(BUYER.LOAD_BUYER_WISHLIST, loadBuyerWishlist);
}

function* watchLoadInsights() {
	yield takeEvery(BUYER.LOAD_BUYER_INSIGHTS, loadInsights);
}

function* watchOverrideBids() {
	yield takeEvery(BUYER.OVERRIDE_BID, loadOverrideBid);
}

function* watchDeleteBid() {
	yield takeEvery(BUYER.DELETE_BID, loadDeleteBid);
}

function* watchDeleteWishlist() {
	yield takeEvery(BUYER.DELETE_WISHLIST, loadDeleteWishlist);
}

function* watchLoadBuyerHistory() {
	yield takeEvery(BUYER.LOAD_BUYER_HISTORY, loadBuyerHistory);
}

function* watchLoadBuyerCompleted() {
	yield takeEvery(BUYER.LOAD_BUYER_COMPLETED, loadBuyerCompleted);
}

function* watchLoadBuyerNotifications() {
	yield takeEvery(BUYER.LOAD_BUYER_NOTIFICATIONS, loadBuyerNotifications);
}

function* watchUpdateBuyerNotifications() {
	yield takeEvery(BUYER.UPDATE_BUYER_NOTIFICATIONS, updateBuyerNotifications);
}

function* watchLoadBuyerAddress() {
	yield takeEvery(BUYER.LOAD_BUYER_ADDRESS, loadBuyerAddress);
}

function* watchSaveBuyerAddress() {
	yield takeEvery(BUYER.SAVE_BUYER_ADDRESS, saveBuyerAddress);
}

function* watchDeleteBuyerAddress() {
	yield takeEvery(BUYER.DELETE_BUYER_ADDRESS, deleteBuyerAddress);
}

function* watchMakePayment() {
	yield takeEvery(BUYER.ADD_PAYMENT, makePayment);
}

function* loadBidProductDetailsAction() {
	yield takeEvery(BUYER.LOAD_BID_PRODUCT, loadBidProduct);
}

function* watchConFirmReceived() {
	yield takeEvery(BUYER.CONFIRM_RECEIVED, confirmReceive);
}

function* watchConFirmDispute() {
	yield takeEvery(BUYER.CONFIRM_DISPUTE, confirmDispute);
}

function* watchAddBid() {
	yield takeEvery(BUYER.ADD_BID, addBid);
}

export function* buyerSaga() {
	yield all([
		watchLoadBids(),
		watchLoadBuyerBids(),
		watchLoadInsights(),
		watchLoadBuyerWishlist(),
		watchOverrideBids(),
		watchDeleteBid(),
		watchDeleteWishlist(),
		watchLoadBuyerHistory(),
		watchLoadBuyerNotifications(),
		watchUpdateBuyerNotifications(),
		watchLoadBuyerAddress(),
		watchSaveBuyerAddress(),
		watchDeleteBuyerAddress(),
		watchMakePayment(),
		watchLoadBuyerCompleted(),
		loadBidProductDetailsAction(),
		watchConFirmReceived(),
		watchConFirmDispute(),
		watchAddBid(),
	]);
}
