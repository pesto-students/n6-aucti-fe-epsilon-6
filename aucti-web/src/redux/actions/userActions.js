import { AUTH } from "../../redux/types";

export const loginUserAction = () => {
	return {
		type: AUTH.LOGIN_USER,
	};
};

export const userLoggedIn = (user) => {
	return {
		type: AUTH.USER_LOGGEDIN,
		user,
	};
};

export const logoutUserAction = () => {
	return {
		type: AUTH.LOGOUT_USER,
	};
};

export const userLoggedOutAction = () => {
	return {
		type: AUTH.USER_LOGGEDOUT,
	};
};
