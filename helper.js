const fs = require("fs");
const cron = require("node-cron");
const { checkAndNotify } = require("./controller/notification");
const { client } = require("./utils");

const writeAuditLog = async (name, message) => {
  const data = new Date().toISOString();
  fs.appendFile("audit.log", `${data} ${name}: ${message}\n`, (err) => {
    if (err) throw err;
  });
};

const startNotificationCron = () => {
  cron.schedule("0 8 * * *", async () => {
    console.log("Running daily notification job");
    await checkAndNotify();
  });
};

const logTransaction = async (userId, expenseId, operation, snapshot) => {
  await client.transactionLog.create({
    data: {
      userId,
      expenseId,
      operation,
      snapshot,
    },
  });
};

const autoCategorize = (notes) => {
  const lower = notes.toLowerCase();
  if (lower.match(/(pizza|burger|restaurant|coffee)/)) return "Food";
  if (lower.match(/(uber|bus|flight|taxi)/)) return "Transportation";
  if (lower.match(/(netflix|cinema|movie)/)) return "Entertainment";
  if (lower.match(/(shirt|jeans|zara|nike)/)) return "Shopping";
  return "Other";
};

module.exports = {
  writeAuditLog,
  autoCategorize,
  startNotificationCron,
  logTransaction,
};
