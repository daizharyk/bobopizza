import { createSlice } from "@reduxjs/toolkit";

const saveToStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const initialState = {
  items:
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      saveToStorage(state.items);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => (item.id === action.payload));

      if (item) {
        item.quantity += 1;
        saveToStorage(state.items);
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => (item.id === action.payload));
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveToStorage(state.items);
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        saveToStorage(state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
