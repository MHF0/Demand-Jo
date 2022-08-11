const express = require("express");
const {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddressByUser,
  getAddressByAdmin,
} = require("../controllers/address");
const authCheck = require("../middlewares/authcheck");

const addressRouter = express.Router();

addressRouter.post("/", authCheck, createAddress);
addressRouter.put("/update/:id", authCheck, updateAddress);
addressRouter.delete("/delete/:id", authCheck, deleteAddress);
addressRouter.get("/user", authCheck, getAddressByUser);
addressRouter.get("/admin/:id", authCheck, getAddressByAdmin);

module.exports = addressRouter;
