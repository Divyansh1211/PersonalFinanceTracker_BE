const { client } = require("../utils");
const { startOfMonth, endOfMonth } = require("date-fns");

const setBudget = async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  try {
    const existing = await client.budget.findFirst({
      where: { userId, month: startOfMonth(new Date(data.month)) },
    });

    if (existing) {
      await client.budget.update({
        where: { id: existing.id },
        data: {
          total_limit: data.total_limit,
          category_limit: data.category_limit,
        },
      });
    } else {
      await client.budget.create({
        data: {
          userId,
          month: startOfMonth(new Date(data.month)),
          total_limit: data.total_limit,
          category_limit: data.category_limit,
        },
      });
    }
    res.json({
      success: true,
      message: "Budget set successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getBudget = async (req, res) => {
  const userId = req.user.id;
  const month = startOfMonth(new Date(req.params.month));
  try {
    const data = await client.budget.findFirst({
      where: { userId, month },
    });
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getMonthlySummary = async (req, res) => {
  const userId = req.user.id;
  const month = req.params.month;
  try {
    const budget = await client.budget.findFirst({
      where: { userId, month: startOfMonth(new Date(month)) },
    });

    const expenses = await client.expenses.findMany({
      where: {
        userId,
        date: {
          gte: startOfMonth(new Date(month)),
          lte: endOfMonth(new Date(month)),
        },
      },
    });

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const categorySummary = {};

    for (const expense of expenses) {
      const cat = expense.category;
      if (!categorySummary[cat]) categorySummary[cat] = 0;
      categorySummary[cat] += expense.amount;
    }

    const breakdown = {};
    for (const cat in budget?.category_limit ?? {}) {
      const spent = categorySummary[cat] || 0;
      const limit = budget?.category_limit[cat] || 0;
      breakdown[cat] = {
        budget: limit,
        spent,
        status: spent > limit ? "over" : "under",
      };
    }

    res.json({
      success: true,
      totalSpent,
      categorySummary,
      breakdown,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { setBudget, getBudget, getMonthlySummary };
