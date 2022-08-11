const express = require("express");
const {
  createSlideImage,
  getSlideImage,
  updateSlideImage,
  deleteSlideImage,
} = require("../controllers/slideImage");
const adminCheck = require("../middlewares/adminCheck");
const authCheck = require("../middlewares/authCheck");

const sliderImageRouter = express.Router();

sliderImageRouter.post("/", authCheck, adminCheck, createSlideImage);
sliderImageRouter.get("/", getSlideImage);
sliderImageRouter.put("/update/:id", authCheck, adminCheck, updateSlideImage);
sliderImageRouter.delete(
  "/delete/:id",
  authCheck,
  adminCheck,
  deleteSlideImage
);

module.exports = sliderImageRouter;
