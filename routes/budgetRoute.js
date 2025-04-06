const express = require("express");
const budgetRouter = express.Router();
const {
  setBudget,
  getBudget,
  getMonthlySummary,
} = require("../controller/budgetController");
const { authMiddleware } = require("../authMiddleware");

/**
 * @swagger
 * /api/v1/budget/set-budget:
 *   post:
 *     summary: Set monthly budget and category-wise limits
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                type: string
 *                format: date
 *               total_limit:
 *                 type: number
 *               category_limit:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *             example:
 *               month: "2025-04-01"
 *               total_limit: 5000
 *               category_limit:
 *                 Food: 2000
 *                 Shopping: 1000
 *     responses:
 *       200:
 *         description: Budget set successfully
 */

budgetRouter.post("/set-budget", authMiddleware, setBudget);

/**
 * @swagger
 * /api/v1/budget/{month}:
 *   get:
 *     summary: Get budget for a specific month
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-04-01"
 *         description: Month in YYYY-MM-DD format (start of month)
 *     responses:
 *       200:
 *         description: Budget fetched successfully
 */

budgetRouter.get("/:month", authMiddleware, getBudget);

/**
 * @swagger
 * /api/v1/budget/summary/{month}:
 *   get:
 *     summary: Get monthly budget vs actual expense summary
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-04-01"
 *         description: Month in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Budget summary returned successfully
 */

budgetRouter.get("/summary/:month", authMiddleware, getMonthlySummary);

module.exports = { budgetRouter };
