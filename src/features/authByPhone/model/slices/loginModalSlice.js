// model/slices/loginModalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState: {
    isOpen: false,
    step: "phone",
    phone: "",
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    openLoginModal: (state) => {
      state.isOpen = true;
    },

    closeLoginModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal, setPhone,setStep } =
  loginModalSlice.actions;
export default loginModalSlice.reducer;
