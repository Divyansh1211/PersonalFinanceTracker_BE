const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  loginUser,
  sendOtp,
  verifyOtp,
} = require("../controller/userController");

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/login/send-otp", sendOtp);
userRouter.post("/login/verify-otp", verifyOtp);

module.exports = { userRouter };
