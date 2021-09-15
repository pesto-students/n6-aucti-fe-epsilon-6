import { takeEvery, call, put, all } from "redux-saga/effects";

import history from "../../routes/history";

import { AUTH } from "../types";
import * as service from "../services/userService";
import * as actions from "../actions/userActions";
import * as alert from "../actions/alertActions";

function* login({ role }) {
	try {
		const user = yield call(service.login, role);

		yield put(actions.userLoggedIn(user));
		yield put(
			alert.setAlertAction({
				text: "User Logged In!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
		history.goBack();
	} catch (e) {
		yield put(
			alert.setAlertAction({
				text: e.msg,
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
		console.log(e);
	}
}

function* logout() {
	try {
		yield call(service.logout);
		yield put(actions.userLoggedOutAction());
		yield put(
			alert.setAlertAction({
				text: "User Logged Out!",
				text_color: "text-blue-700",
				bg_color: "bg-blue-100",
			})
		);
		history.push("/");
	} catch (e) {
		console.log(e);
		yield put(
			alert.setAlertAction({
				text: "Somethin went wrong",
				text_color: "text-red-700",
				bg_color: "bg-red-100",
			})
		);
	}
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
