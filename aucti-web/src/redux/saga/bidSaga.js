import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
import * as service from "../services/bidService";
import * as actions from "../actions/bidAction";

function previously_bidded(product_id, userwishlist) {
  for (let item of userwishlist) {
    if (item.product_id === product_id) {
      console.log("item is", item);
      return item;
    }
  }
  return null;
}
function* placeBid({ user_id, product_id, bid_price }) {
  try {
    const userwishlist = yield call(service.getUserBids, user_id);
    console.log("uwl", userwishlist);
    const bidded = previously_bidded(product_id, userwishlist);
    if (bidded !== null) {
      bidded.bid_price = bid_price;
      const success = yield call(service.updateUserBids, { ...bidded });
      if (success !== undefined || success !== null) {
        yield put(actions.bidPlacedAction(true));
      } else {
        yield put(actions.bidPlacedAction(false));
      }
      //update bid
    } else {
      const product = yield call(service.placeBid, {
        user_id,
        product_id,
        bid_price,
      });
      if (product !== undefined || product !== null) {
        yield put(actions.bidPlacedAction(true));
      } else {
        yield put(actions.bidPlacedAction(false));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchPlaceBid() {
  yield takeEvery(types.PLACE_BID, placeBid);
}

export function* bidSaga() {
  yield all([watchPlaceBid()]);
}
