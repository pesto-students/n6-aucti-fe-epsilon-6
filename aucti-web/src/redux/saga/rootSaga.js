import { all } from "redux-saga/effects";
import { buyerSaga } from "./buyerSaga";
import { sellerSaga } from "./sellerSaga";
import { userSaga } from "./userSaga";
import { productsSaga } from "./productsSaga";
import { productSaga } from "./productSaga";
import { productPerUserSaga } from "./productPerUserSaga";

import { bidSaga } from "./bidSaga";

export default function* rootSaga() {
  yield all([
    productsSaga(),
    productSaga(),
    productSaga(),
    userSaga(),
    buyerSaga(),
    sellerSaga(),
    bidSaga(),
    productPerUserSaga(),
  ]);
}
