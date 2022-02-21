const { Router } = require("express");
const express = require("express");
//Creating a router
const userRouter = express.Router();

const { registerUser, loginUser } = require("../Controllers/usercontrollers");

userRouter.route("/").post(registerUser);
userRouter.route("/login").post(loginUser);

module.exports = userRouter;
