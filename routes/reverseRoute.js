const express = require("express");
const { reverseTransaction } = require("../controller/reverseController");
const { authMiddleware } = require("../authMiddleware");
const reverseRouter = express.Router();

reverseRouter.post("/reverse", authMiddleware, reverseTransaction);

module.exports = { reverseRouter };
