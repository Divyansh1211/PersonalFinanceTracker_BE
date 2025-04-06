const { autoCategorize, logTransaction } = require("../helper");
const { client } = require("../utils");

const createExpense = async (req, res) => {
  const userId = req.user.id;
  const { amount, category, tags, notes } = req.body;
  const updatedCategory = category || autoCategorize(notes || "");
  try {
    const result = await client.expenses.create({
      data: {
        amount,
        category: updatedCategory,
        date: new Date(),
        tags: tags || [],
        notes: notes || "",
        userId,
      },
    });
    await logTransaction(userId, result.id, "CREATE", result);
    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getExpenses = async (req, res) => {
  const userId = req.user.id;
  try {
    const data = await client.expenses.findMany({
      where: { userId },
      orderBy: { date: "desc" },
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

const updateExpense = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { amount, category, tags, notes } = req.body;
  const updatedCategory = category || autoCategorize(notes || "");
  try {
    const existing = await client.expenses.findUnique({ where: { id } });
    console.log(existing);
    if (!existing) {
      return res.json({ success: false, message: "Expense not found" });
    }
    await client.expenses.update({
      where: { id },
      data: {
        amount,
        category: updatedCategory,
        tags: tags || [],
        notes: notes || "",
      },
    });
    await logTransaction(userId, id, "UPDATE", existing);
    res.json({
      success: true,
      message: "Expense updated successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const existing = await client.expenses.findUnique({ where: { id } });
    if (!existing) {
      return res.json({ success: false, message: "Expense not found" });
    }
    await client.expenses.deleteMany({
      where: { id, userId },
    });
    await logTransaction(userId, id, "DELETE", existing);
    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
