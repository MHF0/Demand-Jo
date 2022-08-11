import { createSlice } from "@reduxjs/toolkit";

export const addToCart = createSlice({
  name: "addToCart",
  initialState: {
    addToCart: JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },

  reducers: {
    getAddToCart: (state, action) => {
      state.addToCart = action.payload;
    },

    addAddToCart: (state, action) => {
      state.addToCart.push(action.payload);
    },

    deleteAddToCart: (state, action) => {
      state.addToCart = state.addToCart.filter(
        (addToCart) => addToCart._id !== action.payload
      );
    },

    updateAddToCart: (state, action) => {
      state.addToCart = state.addToCart.map((addToCart) => {
        if (addToCart._id === action.payload._id) {
          return action.payload;
        }
        return addToCart;
      });
    },
  },
});

export const {
  getAddToCart,
  addAddToCart,
  deleteAddToCart,
  updateAddToCart,
} = addToCart.actions;

export default addToCart.reducer;
