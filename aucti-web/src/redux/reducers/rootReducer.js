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
import { sellerProductReducer } from "./sellerProductReducer";
import { sellerInsightsReducer } from "./sellerInsightsReducer";
import { sellerAddProductReducer } from "./sellerAddProductReducer";
import { sellerBidsUserReducer } from "./sellerBidsUserReducer";
import { paymentReducer } from "./paymentReducer";
import { sellerHistoryReducer } from "./sellerHistoryReducer";
import { sellerCompletedReducer } from "./sellerCompletedReducer";
import { buyerCompletedReducer } from "./buyerCompletedReducer";

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
	sellerProducts: sellerProductReducer,
	sellerInsights: sellerInsightsReducer,
	addProductUpdate: sellerAddProductReducer,
	bidsWithUsers: sellerBidsUserReducer,
	paymentMessage: paymentReducer,
	sellerHistory: sellerHistoryReducer,
	sellerCompleted: sellerCompletedReducer,
	buyerCompleted: buyerCompletedReducer,
});
export default rootReducer;
