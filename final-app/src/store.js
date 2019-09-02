import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import rootReducer from "./reducers";

const middleware = applyMiddleware(thunkMiddleWare);
const store = createStore(rootReducer, {}, middleware);
export default store;
