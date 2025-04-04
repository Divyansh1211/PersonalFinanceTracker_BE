const fs = require("fs");
const writeAuditLog = async (name, message) => {
  const data = new Date().toISOString();
  fs.appendFile("audit.log", `${data} ${name}: ${message}\n`, (err) => {
    if (err) throw err;
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

module.exports = { writeAuditLog, autoCategorize };
