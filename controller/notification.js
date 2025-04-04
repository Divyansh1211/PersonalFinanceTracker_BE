const { client } = require("../utils");
const { startOfMonth, endOfMonth, subDays } = require("date-fns");

const now = new Date();

const checkAndNotify = async () => {
  const users = await client.user.findMany();

  for (const user of users) {
    try {
      const budget = await client.budget.findFirst({
        where: {
          userId: user.id,
          month: startOfMonth(now),
        },
      });

      const expenses = await client.expenses.findMany({
        where: {
          userId: user.id,
          date: {
            gte: startOfMonth(now),
            lte: endOfMonth(now),
          },
        },
      });

      const overspent = checkOverspending(expenses, budget);
      const inactive = checkInactivity(expenses);

      if (overspent.length > 0) {
        await sendMockNotification({
          userId: user.id,
          type: "OVERSPENDING_ALERT",
          details: overspent,
        });
      }

      if (inactive) {
        await sendMockNotification({
          userId: user.id,
          type: "INACTIVITY_ALERT",
          message: "No expenses logged in the last 5 days",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const checkOverspending = (expenses, budget) => {
  if (!budget) return [];

  const overspent = [];
  const categoryTotals = {};

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  for (const category in budget.category_limit) {
    const spent = categoryTotals[category] || 0;
    const limit = budget.category_limit[category];
    if (spent > limit) {
      overspent.push({ category, spent, limit });
    }
  }

  return overspent;
};

const checkInactivity = (expenses) => {
  const fiveDaysAgo = subDays(now, 5);
  return !expenses.some((e) => new Date(e.date) > fiveDaysAgo);
};

const sendMockNotification = async (payload) => {
  console.log("📨 Mock Notification Sent:", JSON.stringify(payload, null, 2));
};

module.exports = { checkAndNotify };
