const express = require("express");
const { reverseTransaction } = require("../controller/reverseController");
const { authMiddleware } = require("../authMiddleware");
const reverseRouter = express.Router();

/**
 * @swagger
 * /api/v1/reversals/reverse:
 *   post:
 *     summary: Reverse the most recent expense-related transaction for the logged-in user
 *     tags: [Reversals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Last transaction reversed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaction reversed successfully
 *                 reversedTransaction:
 *                   type: object
 *                   description: The transaction that was reversed
 */

reverseRouter.post("/reverse", authMiddleware, reverseTransaction);

module.exports = { reverseRouter };
