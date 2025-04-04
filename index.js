const express = require("express");
const { userRouter } = require("./routes/userRoute");
const { expenseRouter } = require("./routes/expenseRoute");
const { budgetRouter } = require("./routes/budgetRoute");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/budget", budgetRouter);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
