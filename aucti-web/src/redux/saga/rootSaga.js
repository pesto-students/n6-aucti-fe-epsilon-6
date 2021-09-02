import {all} from 'redux-saga/effects'
import {productsSaga} from './productsSaga'
import {productSaga} from './productSaga'

export default function* rootSaga(){
      yield all([
          productsSaga(),
          productSaga()
      ])
}