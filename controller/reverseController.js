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
    let reversedTransaction;

    if (operation === "CREATE") {
      await client.expenses.delete({ where: { id: snapshot.id } });
      reversedTransaction = `Transaction reversed by deleting ${snapshot.category} - ${snapshot.amount} $`;
    } else if (operation === "UPDATE") {
      reversedTransaction = await client.expenses.update({
        where: { id: snapshot.id },
        data: {
          amount: snapshot.amount,
          category: snapshot.category,
          date: new Date(snapshot.date),
          tags: snapshot.tags,
          notes: snapshot.notes,
        },
      });
    } else if (operation === "DELETE") {
      reversedTransaction = await client.expenses.create({
        data: {
          id: snapshot.id,
          userId: snapshot.userId,
          amount: snapshot.amount,
          category: snapshot.category,
          date: new Date(snapshot.date),
          tags: snapshot.tags,
          notes: snapshot.notes,
        },
      });
    }
    await client.reversalLog.create({
      data: {
        userId,
        originalLogId: lastLog.id,
      },
    });

    res.json({ success: true, reversedTransaction })
  } catch (err) {
    console.error(" Error reversing transaction:", err);
    res.json({ success: false, message: err.message });
  }
};

module.exports = { reverseTransaction };
