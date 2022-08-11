const express = require("express");
const {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand");
const authCheck = require("../middlewares/authCheck");
const adminCheck = require("../middlewares/adminCheck");

const brandRouter = express.Router();

brandRouter.post("/", authCheck, adminCheck, createBrand);
brandRouter.get("/", getBrand);
brandRouter.put("/update/:id", authCheck, adminCheck, updateBrand);
brandRouter.delete("/delete/:id", authCheck, adminCheck, deleteBrand);

module.exports = brandRouter;
