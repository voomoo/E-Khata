//redux-toolkit imports
import { combineReducers } from "@reduxjs/toolkit";

//local imports
import userAuthReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
});

export default rootReducer;
