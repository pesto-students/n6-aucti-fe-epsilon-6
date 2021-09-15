import { AUTH } from "../../redux/types";

export const loginUserAction = (role) => {
	return {
		type: AUTH.LOGIN_USER,
		role,
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

export const toggleSidebarAction = () => {
	return {
		type: AUTH.TOGGLE_SIDEBAR,
	};
};

export const showpriceRangeAction = () => {
	return {
		type: AUTH.SHOW_PRICE_RANGE,
	};
};

export const filterSearchResultAction = (filter) => {
	return {
		type: AUTH.FILTER_SEARCH,
		filter,
	};
};
