import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import detailReducer from "./detailSlice";

const store = configureStore({
  reducer: { auth: AuthReducer, detail: detailReducer },
});

export default store;
