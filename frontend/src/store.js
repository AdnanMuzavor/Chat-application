import { createStore, compose, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";
import {ChatReducers} from "./Reducers/ChatReducers";
import { UserReducers } from "./Reducers/UserReducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  UserDetails: {
    UserInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
      
  },
};

const reducer = combineReducers({
  UserDetails: UserReducers,
  ChatDetails:ChatReducers,
});

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
