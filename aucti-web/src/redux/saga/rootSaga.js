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
}