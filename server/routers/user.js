const express = require("express");

const { getUserById } = require("../controllers/user");
const authCheck = require("../middlewares/authCheck");

const userRouter = express.Router();

userRouter.get("/", authCheck, getUserById);

module.exports = userRouter;
