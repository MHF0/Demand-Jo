import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    userInfo: {},
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
    },

    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, getUserInfo } = auth.actions;

export default auth.reducer;
