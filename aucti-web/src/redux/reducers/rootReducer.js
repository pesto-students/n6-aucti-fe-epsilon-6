import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { productReducer } from "./productReducer";
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
import { bidProductReducer } from "./bidProductReducer";
import { sideBarReducer } from "./sideBarReducer";
import { filterReducer } from "./filterReducer";
import { priceRangeReducer } from "./priceRangeReducer";
import { specialProductsReducer } from "./specialProductsReducer";
import { bankAccountsReducer } from "./bankAccountsReducer";

const rootReducer = combineReducers({
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
	productReducer,
	productsReducer,
	bidproduct: bidProductReducer,
	sideBar: sideBarReducer,
	searchFilter: filterReducer,
	priceRangeComponent: priceRangeReducer,
	specialProducts: specialProductsReducer,
	sellerBankAccounts: bankAccountsReducer,
});
export default rootReducer;
