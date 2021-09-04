import { all } from "redux-saga/effects";
import { buyerSaga } from "./buyerSaga";
import { productSaga } from "./productSaga";
import { sellerSaga } from "./sellerSaga";
import { userSaga } from "./userSaga";
import {all} from 'redux-saga/effects'
import {productsSaga} from './productsSaga'
import {productSaga} from './productSaga'
import { wishlistSaga } from './wishlistSaga'
import { bidSaga } from './bidSaga'


export default function* rootSaga(){
      yield all([
          productsSaga(),
          productSaga(),
          wishlistSaga(),
          bidSaga()
      ])
export default function* rootSaga() {
	yield all([productSaga(), userSaga(), buyerSaga(), sellerSaga()]);
}
