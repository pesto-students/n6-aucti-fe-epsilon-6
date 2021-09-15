import { NOTIFICATION } from "../types";

/**
 *
 * @param {text_color, bg_color, text} msg
 */
export const setAlertAction = (msg) => {
	return {
		type: NOTIFICATION.SET_ALERT,
		msg,
	};
};

export const resetAlertAction = () => {
	return {
		type: NOTIFICATION.RESET_ALERT,
	};
};
