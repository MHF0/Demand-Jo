const express = require("express");
const { register } = require("../controllers/register");
const login = require("../controllers/login");

const registerRouter = express.Router();

registerRouter.post("/", register, login);

module.exports = registerRouter;
