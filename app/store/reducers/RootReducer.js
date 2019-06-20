import UserReducer from "./UserReducer";

import { combineReducers } from "redux";

const RootReducer = combineReducers({
  user: UserReducer
});

export default RootReducer;
