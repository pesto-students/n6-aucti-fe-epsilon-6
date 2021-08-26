import { takeEvery, call, put, all } from "redux-saga/effects";

import * as service from "../services/bidService";
import * as actions from "../actions/bidActions";
import * as alerts from "../actions/alertActions";
import { BID } from "../types";

//Worker Sagas
function* loadBids() {
	try {
		const bids = yield call(service.getBids);
		yield put(actions.bidLoadedAction(bids));
	} catch (e) {
		console.log(e);
	}
}
function* loadBuyerBids({ id, currentPage, itemsPerPage }) {
	try {
		const BuyerBids = yield call(
			service.getByerBids,
			id,
			currentPage,
			itemsPerPage
		);
		yield put(actions.buyerBidLoadedAction(BuyerBids));
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

//Watcher Sagas
function* watchLoadBids() {
	yield takeEvery(BID.LOAD_BIDS, loadBids);
}

function* watchLoadBuyerBids() {
	yield takeEvery(BID.LOAD_BUYER_BIDS, loadBuyerBids);
}

function* watchOverrideBids() {
	yield takeEvery(BID.OVERRIDE_BID, loadOverrideBid);
}

function* watchDeleteBid() {
	yield takeEvery(BID.DELETE_BID, loadDeleteBid);
}

export function* bidSaga() {
	yield all([
		watchLoadBids(),
		watchLoadBuyerBids(),
		watchOverrideBids(),
		watchDeleteBid(),
	]);
}
