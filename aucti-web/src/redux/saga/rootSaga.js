import {all} from 'redux-saga/effects'
import {productsSaga} from './productsSaga'
import {productSaga} from './productSaga'
import { wishlistSaga } from './wishlistSaga'

export default function* rootSaga(){
      yield all([
          productsSaga(),
          productSaga(),
          wishlistSaga()
      ])
}