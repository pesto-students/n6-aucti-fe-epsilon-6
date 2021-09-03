import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { productsReducer } from "./productsReducer";
import { wishlistReducer } from "./wishlistReducer"
import { bidReducer } from "./bidReducer"
const rootReducer = combineReducers({
  productsReducer,
  productReducer,
  wishlistReducer,
  bidReducer
});
export default rootReducer;
