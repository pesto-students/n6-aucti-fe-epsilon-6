import { combineReducers } from "redux";
import { productReducer } from "./productsReducer";
import { userReducer } from "./userReducer";
import { alertReducer } from "./alertReducer";
import { bidReducer } from "./bidReducer";
import { buyerBidReducer } from "./buyerBidReducer";

const rootReducer = combineReducers({
	products: productReducer,
	user: userReducer,
	alert: alertReducer,
	bids: bidReducer,
	buyerBids: buyerBidReducer,
});
export default rootReducer;
