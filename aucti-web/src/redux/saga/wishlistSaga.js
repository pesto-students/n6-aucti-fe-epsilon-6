import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
import * as service from "../services/wishlistService";
import * as actions from "../actions/wishlistActions";

const already_in_wishlist = (product_id, product_list) => {
  for (let product of product_list) {
    if (product.product_id === product_id) return true;
  }
  return false;
};
function* addWishlist({ user_id, product_id }) {
  try {
    const wishlist = yield call(service.getUserWishlist, user_id);
    if (wishlist.length === 0) {
      yield call(service.addUserWishlist,{user_id, product_id});
      yield put(actions.wishlistAddedAction(true));
    } else {
      const found = already_in_wishlist( product_id, wishlist);
      if (found) {
        yield put(actions.wishlistAddedAction(false));
      } else {
        yield call(service.addUserWishlist, {user_id, product_id} );//err
        yield put(actions.wishlistAddedAction(true));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchAddWishlist() {
  yield takeEvery(types.ADD_WISHLIST, addWishlist);
}

export function* wishlistSaga() {
  yield all([watchAddWishlist()]);
}
