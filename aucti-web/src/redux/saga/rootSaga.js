import { all } from "redux-saga/effects";
import { buyerSaga } from "./buyerSaga";
import { productSaga } from "./productSaga";
import { sellerSaga } from "./sellerSaga";
import { userSaga } from "./userSaga";
import { productsSaga } from "./productsSaga";
import { wishlistSaga } from "./wishlistSaga";

export default function* rootSaga() {
	yield all([
		productsSaga(),
		productSaga(),
		wishlistSaga(),
		productSaga(),
		userSaga(),
		buyerSaga(),
		sellerSaga(),
	]);
}
