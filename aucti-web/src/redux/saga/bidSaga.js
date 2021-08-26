import { takeEvery, call, put, all } from "redux-saga/effects";

import * as service from "../services/bidService";
import * as actions from "../actions/bidActions";

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

//Watcher Sagas
function* watchLoadBids() {
	yield takeEvery(BID.LOAD_BIDS, loadBids);
}

function* watchLoadBuyerBids() {
	yield takeEvery(BID.LOAD_BUYER_BIDS, loadBuyerBids);
}

export function* bidSaga() {
	yield all([watchLoadBids(), watchLoadBuyerBids()]);
}
