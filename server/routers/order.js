const express = require("express");

const {
  createOrder,
  changeIsDelivered,
  getOrderHistory,
  AdminGetOrderHistory,
  orderStatusUpdate,
  getIsDelevered,
  isDeleted,
  changeIsDone,
} = require("../controllers/order");

const authCheck = require("../middlewares/authCheck");
const adminCheck = require("../middlewares/adminCheck");

const orderRouters = express.Router();

orderRouters.post("/create", authCheck, createOrder);
orderRouters.put("/confirm/:orderId", authCheck, changeIsDelivered);
orderRouters.get("/history", authCheck, getOrderHistory);
orderRouters.get("/admin/order", authCheck, adminCheck, AdminGetOrderHistory);
orderRouters.put(
  "/admin/update/order/:orderId",
  authCheck,
  adminCheck,
  orderStatusUpdate
);
orderRouters.put("/user/delete/:orderId", authCheck, isDeleted);
orderRouters.get("/delivered", authCheck, getIsDelevered);
orderRouters.put("/done/:orderId", authCheck, changeIsDone);

module.exports = orderRouters;
