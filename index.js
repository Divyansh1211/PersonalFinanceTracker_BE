const express = require("express");
const { userRouter } = require("./routes/userRoute");
const { expenseRouter } = require("./routes/expenseRoute");
const { budgetRouter } = require("./routes/budgetRoute");
const { scoreRouter } = require("./routes/scoreRoute");
const { startNotificationCron } = require("./helper");
const { reverseRouter } = require("./routes/reverseRoute");
const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();
const PORT = 5000;

startNotificationCron();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/score", scoreRouter);
app.use("/api/v1/reversals", reverseRouter);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
