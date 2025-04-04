const { client } = require("../utils");

const reverseTransaction = async (req, res) => {
  const userId = req.user.id;
  try {
    const reversedIds = await client.reversalLog.findMany({
      where: { userId },
      select: { originalLogId: true },
    });

    const lastLog = await client.transactionLog.findFirst({
      where: {
        userId,
        id: { notIn: reversedIds.map((r) => r.originalLogId) },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!lastLog) {
      return res.json({ success: false, message: "No transaction to reverse" });
    }

    const { operation, snapshot } = lastLog;

    if (operation === "CREATE") {
      await client.transactionLog.delete({ where: { id: lastLog.id } });
    } else if (operation === "UPDATE") {
      await client.transactionLog.update({
        where: { id: snapshot.id },
        data: snapshot,
      });
    } else if (operation === "DELETE") {
      await client.transactionLog.create({
        data: {
          userId: snapshot.userId,
          expenseId: snapshot.id,
          operation: "CREATE",
          snapshot,
        },
      });
    }
    await client.reversalLog.create({
      data: {
        userId,
        originalLogId: lastLog.id,
      },
    });
    res.json({ success: true, message: "Transaction reversed successfully" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

module.exports = { reverseTransaction };
