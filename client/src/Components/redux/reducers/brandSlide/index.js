import { createSlice } from "@reduxjs/toolkit";

export const brandSlide = createSlice({
  name: "brandSlide",
  initialState: {
    brandSlides: [],
  },
  reducers: {
    getBrandSlide: (state, action) => {
      state.brandSlides = action.payload;
    },

    addBrandSlide: (state, action) => {
      state.brandSlides.push(action.payload);
    },

    deleteBrandSlide: (state, action) => {
      state.brandSlides = state.sliderImages.filter(
        (brandSlide) => brandSlide._id !== action.payload
      );
    },
  },
});

export const {
  getBrandSlide,
  addBrandSlide,
  deleteBrandSlide,
} = brandSlide.actions;

export default brandSlide.reducer;
