import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import popupReducer from "./slices/popupSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    popup: popupReducer,
  },
});
