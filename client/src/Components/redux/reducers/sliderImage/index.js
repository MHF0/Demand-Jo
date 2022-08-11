import { createSlice } from "@reduxjs/toolkit";

export const sliderImage = createSlice({
  name: "sliderImage",
  initialState: {
    sliderImages: [],
  },
  reducers: {
    getSliderImages: (state, action) => {
      state.sliderImages = action.payload;
    },

    addSliderImage: (state, action) => {
      state.sliderImages.push(action.payload);
    },

    deleteSliderImage: (state, action) => {
      state.sliderImages = state.sliderImages.filter(
        (sliderImage) => sliderImage.id !== action.payload
      );
    },
  },
});

export const { getSliderImages, addSliderImage, deleteSliderImage } = sliderImage.actions;

export default sliderImage.reducer;
