import { all } from "redux-saga/effects";
import { buyerSaga } from "./buyerSaga";
import { sellerSaga } from "./sellerSaga";
import { userSaga } from "./userSaga";
import { wishlistSaga } from "./wishlistSaga";
import {productsSaga} from './productsSaga'
import {productSaga} from './productSaga'
import { wishlistSaga } from './wishlistSaga'
import { bidSaga } from './bidSaga'



export default function* rootSaga() {
    yield all([
        productsSaga(),
        productSaga(),
        wishlistSaga(),
        productSaga(),
        userSaga(),
        buyerSaga(),
        sellerSaga(),
        bidSaga(),
    ]);
}