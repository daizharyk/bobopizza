// store/popupSlice.js
import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    data: null,
  },
  reducers: {
    showPopup(state, action) {
      state.data = action.payload;
    },
    hidePopup(state) {
      state.data = null;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
