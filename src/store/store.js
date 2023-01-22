import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authSlice,
  },
});
