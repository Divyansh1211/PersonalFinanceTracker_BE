const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  loginUser,
  sendOtp,
  verifyOtp,
} = require("../controller/userController");

// /**
//  * @swagger
//  * /api/v1/user/signup:
//  *   post:
//  *     summary: User signup
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *               password:
//  *                 type: string
//  *               name:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User created successfully
//  *       400:
//  *         description: Invalid input or user already exists
//  */

// userRouter.post("/signup", createUser);

// /**
//  * @swagger
//  * /api/v1/user/login:
//  *   post:
//  *     summary: Login with email and password
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *       401:
//  *         description: Invalid credentials
//  */

// userRouter.post("/login", loginUser);

/**
 * @swagger
 * /api/v1/user/login/send-otp:
 *   get:
 *     summary: Request OTP for login (mocked)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OTP sent successfully (mocked)
 *       404:
 *         description: User not found
 */

userRouter.get("/login/send-otp", sendOtp);

/**
 * @swagger
 * /api/v1/user/login/verify-otp:
 *   post:
 *     summary: Verify OTP for login (mocked)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified, login successful
 *       400:
 *         description: Invalid or expired OTP
 */

userRouter.post("/login/verify-otp", verifyOtp);

module.exports = { userRouter };
