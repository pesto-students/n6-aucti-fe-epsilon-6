import { takeEvery, call, put, all } from "redux-saga/effects";

import history from "../../routes/history";

import { AUTH } from "../types";
import * as service from "../services/userService";
import * as actions from "../actions/userActions";
// import * as alert from "../actions/alertActions";

function* login() {
	try {
		const result = yield call(service.login);
		const user = result.user;
		yield put(actions.userLoggedIn(user));
		// yield put(
		// 	alert.setAlertAction({
		// 		text: "User Logged In!",
		// 		color: "success",
		// 	})
		// );

		if (result?.additionalUserInfo?.isNewUser) {
			console.log("new user");
			console.log(history);
			history.push("/register");
		} else {
			history.push("/");
		}
	} catch (e) {
		// yield put(
		// 	alert.setAlertAction({
		// 		text: e.msg,
		// 		color: "danger",
		// 	})
		// );
		console.log(e);
	}
}

function* logout() {
	yield call(service.logout);
	yield put(actions.userLoggedOutAction());
	history.push("/");
}

function* watchLoginUser() {
	yield takeEvery(AUTH.LOGIN_USER, login);
}

function* watchLogoutUser() {
	yield takeEvery(AUTH.LOGOUT_USER, logout);
}

export function* userSaga() {
	yield all([watchLoginUser(), watchLogoutUser()]);
}
