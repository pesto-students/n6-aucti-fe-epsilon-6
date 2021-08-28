import { createStore,applyMiddleware } from "redux";
import rootReducer from './reducers/rootReducer.js'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga.js";

const saga = createSagaMiddleware()

const store = createStore(rootReducer,applyMiddleware(saga))

saga.run(rootSaga)

export default store