const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryByCategoryId,
} = require("../controllers/subCategory");

const authCheck = require("../middlewares/authCheck");
const adminCheck = require("../middlewares/adminCheck");

const subCategoryRoute = express.Router();

subCategoryRoute.post("/", authCheck, adminCheck, createSubCategory);
subCategoryRoute.get("/", getSubCategory);
subCategoryRoute.put("/:id", authCheck, adminCheck, updateSubCategory);
subCategoryRoute.delete("/:id", authCheck, adminCheck, deleteSubCategory);
subCategoryRoute.get("/category/:id", getSubCategoryByCategoryId);

module.exports = subCategoryRoute;
