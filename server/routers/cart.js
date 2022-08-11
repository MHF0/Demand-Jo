const express = require("express");

const {
  addToCart,
  getCartByUser,
  deleteFromCart,
  updateCart,
} = require("../controllers/cart");

const authCheck = require("../middlewares/authCheck");

const cartRoute = express.Router();

cartRoute.post("/", authCheck, addToCart);
cartRoute.get("/", authCheck, getCartByUser);
cartRoute.delete("/", authCheck, deleteFromCart);
cartRoute.put("/:id", authCheck, updateCart);

module.exports = cartRoute;
