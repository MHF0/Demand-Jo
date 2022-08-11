const express = require("express");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const authCkeck = require("../middlewares/authCheck");
const adminCheck = require("../middlewares/adminCheck");

const categoryRoute = express.Router();

categoryRoute.post("/", authCkeck, adminCheck, createCategory);
categoryRoute.get("/", getAllCategories);
categoryRoute.put("/update/:id", authCkeck, adminCheck, updateCategory);
categoryRoute.delete("/delete/:id", authCkeck, adminCheck, deleteCategory);

module.exports = categoryRoute;
