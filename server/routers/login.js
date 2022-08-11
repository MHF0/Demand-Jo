const express = require("express");
const login = require("../controllers/login");

const loginRoute = express.Router();

loginRoute.post("/", login);

module.exports = loginRoute;
