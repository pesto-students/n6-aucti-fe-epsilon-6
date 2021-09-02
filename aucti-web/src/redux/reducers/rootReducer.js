import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { productsReducer } from "./productsReducer";
const rootReducer = combineReducers({
  productsReducer,
  productReducer,
});
export default rootReducer;
