const express = require("express");
const { authMiddleware } = require("../authMiddleware");
const { generateScore } = require("../controller/scoreController");
const scoreRouter = express.Router();

/**
 * @swagger
 * /api/v1/score/calculate-score:
 *   get:
 *     summary: Calculate the behavior score for the logged-in user
 *     tags: [Scores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's score (0–100) based on budget adherence, frequency of usage, and expense discipline
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score:
 *                   type: number
 *                   example: 82
 *                 details:
 *                   type: object
 *                   properties:
 *                     budgetAdherence:
 *                       type: number
 *                       example: 24
 *                     usageFrequency:
 *                       type: number
 *                       example: 27
 *                     expenseDiscipline:
 *                       type: number
 *                       example: 31
 */

scoreRouter.get("/calculate-score", authMiddleware, generateScore);

module.exports = { scoreRouter };
