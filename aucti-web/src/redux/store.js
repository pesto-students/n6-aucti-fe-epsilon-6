import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer.js";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga.js";
import { checkUser } from "./services/userService.js";
import { userLoggedIn } from "./actions/userActions.js";

const saga = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(saga));

const user = checkUser();
if (user) {
	store.dispatch(userLoggedIn(user));
}

saga.run(rootSaga);

export default store;
