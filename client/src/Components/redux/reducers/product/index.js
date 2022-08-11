import { createSlice } from "@reduxjs/toolkit";

export const product = createSlice({
  name: "product",
  initialState: {
    products: {},
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    updateProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
    },

    getProductById: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id === action.payload
      );

      return state.products;
    },
  },
});

export const {
  getProducts,
  addProduct,
  deleteProduct,
  getProductById,
} = product.actions;

export default product.reducer;
