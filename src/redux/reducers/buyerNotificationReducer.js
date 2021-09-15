/* eslint-disable no-case-declarations */
import { BUYER } from "../types";

const initialState = [];

export const buyerNotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUYER.BIDS_NOTIFICATIONS_LOADED:
			return action.notifications;
		case BUYER.BIDS_NOTIFICATIONS_UPDATED:
			const filter = state.filter((bid) => bid.id !== action.notification.id);
			return [...filter];
		default:
			return state;
	}
};
