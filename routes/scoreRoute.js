const express = require("express");
const { authMiddleware } = require("../authMiddleware");
const { generateScore } = require("../controller/scoreController");
const scoreRouter = express.Router();

scoreRouter.get("/calculate-score", authMiddleware, generateScore);

module.exports = { scoreRouter };
