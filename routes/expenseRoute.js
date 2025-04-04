const express = require("express");
const expenseRouter = express.Router();
const { authMiddleware } = require("../authMiddleware");
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");

expenseRouter.post("/create-expense", authMiddleware, createExpense);
expenseRouter.get("/get-expenses", authMiddleware, getExpenses);
expenseRouter.put("/:id", authMiddleware, updateExpense);
expenseRouter.delete("/delete-expense/:id", authMiddleware, deleteExpense);

module.exports = { expenseRouter };
