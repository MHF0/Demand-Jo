import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import sliderImageReducer from "./reducers/sliderImage";
import brandSlideReducer from "./reducers/brandSlide";
import product from "./reducers/product";
import addToCart from "./reducers/addToCart";
import userAddress from "./reducers/userAddress";

export default configureStore({
  reducer: {
    auth: authReducer,
    sliderImage: sliderImageReducer,
    brandSlide: brandSlideReducer,
    product: product,
    addToCart: addToCart,
    userAddress: userAddress,
  },
});
