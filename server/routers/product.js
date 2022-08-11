const express = require("express");
const {
  getAllProduct,
  getProductByCategory,
  getProductBySubCategory,
  getProductByBrand,
  getProductByCategoryAndSubCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
  getProductById,
  getAllProductAdmins
} = require("../controllers/product");

const authCheck = require("../middlewares/authCheck");
const adminCheck = require("../middlewares/adminCheck");

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/category/:name", getProductByCategory);
productRouter.get("/subCategory/:name", getProductBySubCategory);
productRouter.get("/brand/:name", getProductByBrand);
productRouter.get(
  "/category/:category/subCategory/:subCategory",
  getProductByCategoryAndSubCategory
);
productRouter.post("/", authCheck, adminCheck, createProduct);
productRouter.put("/update/:id", authCheck, adminCheck, updateProduct);
productRouter.delete("/delete/:id", authCheck, adminCheck, deleteProduct);
productRouter.get("/search/:name", getProductBySearch);
productRouter.get("/:id", getProductById);
productRouter.get("/admin/all", authCheck, adminCheck, getAllProductAdmins);

module.exports = productRouter;
