import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
import * as service from "../services/wishlistService";
import * as actions from "../actions/wishlistActions";
import * as alerts from "../actions/alertActions";

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
      yield call(service.addUserWishlist, { user_id, product_id });
      yield put(actions.wishlistAddedAction(true));
      yield put(
        alerts.setAlertAction({
          text: "Product added to your wishlist!",
          text_color: "text-blue-700",
          bg_color: "bg-blue-100",
        })
      );
    } else {
      const found = already_in_wishlist(product_id, wishlist);
      if (found) {
        yield put(actions.wishlistAddedAction(false));
      } else {
        yield call(service.addUserWishlist, { user_id, product_id }); //err
        yield put(actions.wishlistAddedAction(true));
        yield put(
          alerts.setAlertAction({
            text: "Product added to your wishlist!",
            text_color: "text-blue-700",
            bg_color: "bg-blue-100",
          })
        );
      }
    }
  } catch (e) {
    console.log(e);
    yield put(
      alerts.setAlertAction({
        text: "We couldn't add to your wishlist at the moment!",
        text_color: "text-red-700",
        bg_color: "bg-red-100",
      })
    );
  }
}

function* watchAddWishlist() {
  yield takeEvery(types.ADD_WISHLIST, addWishlist);
}

export function* wishlistSaga() {
  yield all([watchAddWishlist()]);
}
