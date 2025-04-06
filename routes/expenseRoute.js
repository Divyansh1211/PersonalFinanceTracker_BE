const express = require("express");
const expenseRouter = express.Router();
const { authMiddleware } = require("../authMiddleware");
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");

/**
 * @swagger
 * /api/v1/expense/create-expense:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: [Food, Transportation, Shopping, Entertainment, Other]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expense created successfully
 */

expenseRouter.post("/create-expense", authMiddleware, createExpense);

/**
 * @swagger
 * /api/v1/expense/get-expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 */
expenseRouter.get("/get-expenses", authMiddleware, getExpenses);

/**
 * @swagger
 * /api/v1/expense/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the expense to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: [Food, Transportation, Shopping, Entertainment, Other]
 *               date:
 *                 type: string
 *                 format: date
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense updated successfully
 */

expenseRouter.put("/:id", authMiddleware, updateExpense);

/**
 * @swagger
 * /api/v1/expense/delete-expense/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the expense to delete
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
 
expenseRouter.delete("/delete-expense/:id", authMiddleware, deleteExpense);

module.exports = { expenseRouter };
