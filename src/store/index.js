import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../entites/cart/model/cartSlice";
import popupReducer from "./slices/popupSlice";
import loginModalReducer from "../features/authByPhone/model/slices/loginModalSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    popup: popupReducer,
    loginModal: loginModalReducer
  },
});
