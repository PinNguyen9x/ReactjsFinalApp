import { combineReducers } from "redux";
import categoriesReducer from "./categories";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer
});

export default rootReducer;
