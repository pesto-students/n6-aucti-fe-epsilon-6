import { combineReducers } from "redux";
import { productReducer } from "./productsReducer";
import { userReducer } from "./userReducer";
import { alertReducer } from "./alertReducer";
import { bidReducer } from "./bidReducer";
import { buyerBidReducer } from "./buyerBidReducer";
import { buyerInsightsReducer } from "./buyerInsightsReducer";
import { buyerWishlistReducer } from "./buyerWishlistReducer";
import { buyerHistoryReducer } from "./buyerHistoryReducer";
import { buyerNotificationReducer } from "./buyerNotificationReducer";
import { addressReducer } from "./addressReducer";

const rootReducer = combineReducers({
	products: productReducer,
	user: userReducer,
	alert: alertReducer,
	bids: bidReducer,
	buyerBids: buyerBidReducer,
	insights: buyerInsightsReducer,
	wishlist: buyerWishlistReducer,
	buyerHistory: buyerHistoryReducer,
	notifications: buyerNotificationReducer,
	addresses: addressReducer,
});
export default rootReducer;
