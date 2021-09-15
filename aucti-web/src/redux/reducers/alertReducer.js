import { NOTIFICATION } from "../types";

const initialState = {
  text_color: "",
  bg_color: "",
  text: "",
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION.SET_ALERT:
      return action.msg;

    case NOTIFICATION.RESET_ALERT:
      return initialState;

    default:
      return state;
  }
};
