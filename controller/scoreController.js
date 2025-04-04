const { client } = require("../utils");
const {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} = require("date-fns");

const now = new Date();
const start = startOfMonth(now);
const end = endOfMonth(now);

const generateScore = async (req, res) => {
  const userId = req.user.id;
  const [budget, expenses] = await Promise.all([
    client.budget.findFirst({ where: { userId, month: start } }),
    client.expenses.findMany({
      where: {
        userId,
        date: { gte: start, lte: end },
      },
    }),
  ]);

  const budgetScore = computeBudgetAdherenceScore(expenses, budget);
  const frequencyScore = computeFrequencyScore(expenses);
  const disciplineScore = computeDisciplineScore(expenses);

  const finalScore = Math.round(
    0.3 * budgetScore + 0.3 * frequencyScore + 0.4 * disciplineScore
  );

  res.json({
    success: true,
    budgetScore,
    frequencyScore,
    disciplineScore,
    finalScore,
  });
};

const computeBudgetAdherenceScore = (expenses, budget) => {
  if (!budget) return 0;

  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  let score = 0;
  const limits = budget.category_limit ?? {};
  const categories = Object.keys(limits);

  categories.forEach((cat) => {
    const spent = categoryTotals[cat] || 0;
    const limit = limits[cat] || 1;

    const ratio = spent / limit;
    if (ratio <= 1.1 && ratio >= 0.8) score += 1;
  });

  return Math.round((score / categories.length) * 100) || 0;
};

const computeFrequencyScore = (expenses) => {
  const daysSet = new Set(expenses.map((e) => new Date(e.date).toDateString()));
  const totalDays = eachDayOfInterval({ start, end }).length;

  const freqRatio = daysSet.size / totalDays;
  return Math.round(Math.min(freqRatio * 100, 100));
};

const computeDisciplineScore = (expenses) => {
  const activityMap = new Map();

  expenses.forEach((e) => {
    const day = new Date(e.date).toDateString();
    activityMap.set(day, (activityMap.get(day) || 0) + 1);
  });

  const activeDays = activityMap.size;
  const weeks = Math.ceil((end.getDate() - start.getDate() + 1) / 7);
  const expectedDays = weeks * 3;

  const ratio = activeDays / expectedDays;
  return Math.round(Math.min(ratio * 100, 100));
};

module.exports = { generateScore };
