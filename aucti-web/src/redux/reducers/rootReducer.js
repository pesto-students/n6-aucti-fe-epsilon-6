import { combineReducers } from "redux";
import { productReducer } from "./productsReducer";
import { userReducer } from "./userReducer";
import { alertReducer } from "./alertReducer";

const rootReducer = combineReducers({
	products: productReducer,
	user: userReducer,
	alert: alertReducer,
});
export default rootReducer;
