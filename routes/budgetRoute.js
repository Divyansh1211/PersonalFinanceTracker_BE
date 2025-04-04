const express = require("express");
const budgetRouter = express.Router();
const {
  setBudget,
  getBudget,
  getMonthlySummary,
} = require("../controller/budgetController");
const { authMiddleware } = require("../authMiddleware");

budgetRouter.post("/set-budget", authMiddleware, setBudget);
budgetRouter.get("/:month", authMiddleware, getBudget);
budgetRouter.get("/summary/:month", authMiddleware, getMonthlySummary);

module.exports = { budgetRouter };
