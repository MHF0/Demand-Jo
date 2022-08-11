import { createSlice } from "@reduxjs/toolkit";

export const userAddress = createSlice({
  name: "userAddress",
  initialState: {
    userAddresses: [],
  },
  reducers: {
    getAddress: (state, action) => {
      state.userAddresses = action.payload;
    },

  },
});

export const { getAddress } = userAddress.actions;

export default userAddress.reducer;
