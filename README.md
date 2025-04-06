# 💸 Personal Finance Tracker API

A modular and extensible backend system for tracking personal finances, managing budgets, computing behavioral scores, and sending timely notifications. Built using **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

---

## 🧰 Tech Stack

- **Node.js + Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication / OTP Simulation**
- **Cron Jobs (node-cron)**
- **Swagger / Postman Documentation**

---

## 📁 Project Structure

```
├── controller/        # Route logic
├── authMiddleware.js  # Checks Token and Role 
├── prisma/            # Prisma schema & DB client
├── routes/            # Express route definitions
├── utils.js           # Helper utilities
├── index.js           # Server entry point
├── helper.js          # Helper Functions
├── .env               # Environment variables
├── README.md
```

---

## ✅ Features

### 1. User Authentication

- JWT-based login/signup
- Role-based access (Admin/User)
- Password hashing
- Audit log for login/signup
- OTP Simulation (mocked endpoint)

### 2. Expense & Budget Management

- Full CRUD for expenses
- Monthly & category-wise budget limits
- Heuristic-based auto-categorization
- Summary report: budget vs actual

### 3. User Score Generator

Behavioral score out of 100 based on:

- Budget adherence (30%)
- Frequency of usage (30%)
- Expense tracking discipline (40%)

### 4. Notification Engine

- Runs at 8AM everyday 
- Detects:
  - Overspending in any category
  - Inactivity > 5 days
- Sends mock notifications with structured JSON

### 5. Transaction Ledger & Reversal

- Logs all expense operations (create/edit/delete)
- Stores full snapshot for reversals
- Reversal endpoint to undo last operation safely

---

## 🔐 Auth Endpoints

| Method | Route                          | Description            |
| ------ | ------------------------------ | ---------------------- |
| POST   | /api/v1/user/signup            | Register new user      |
| POST   | /api/v1/user/login             | Login with credentials |
| GET    | /api/v1/user/login/send-otp    | Get OTP                |
| POST   | /api/v1/user/login/verify-otp  | Simulated OTP request  |

---

## 💸 Expense & Budget Endpoints

| Method | Route                             | Description              |
| ------ | --------------------------------- | ------------------------ |
| GET    | /api/v1/expense/get-expenses      | List all expenses        |
| POST   | /api/v1/expense/create-expense    | Create new expense       |
| PUT    | /api/v1/expense/\:id              | Update an expense        |
| DELETE | /api/v1/expense/\:id              | Delete an expense        |
| POST   | /api/v1/budget/set-budget         | Set monthly budget       |
| GET    | /api/v1/budget/summary/\:month    | Budget vs Actual summary |

---

## 🔁 Generate Score Endpoints

| Method | Route                          | Description                     |
| ------ | ------------------------------ | ------------------------------- |
| POST   | /api/v1/score/generate-score   | Get User's Score                |

---

## 🔁 Reversal Endpoint

| Method | Route                    | Description                     |
| ------ | ------------------------ | ------------------------------- |
| POST   | /api/v1/reversals/reverse| Reverts the last user operation |

---

## 🔔 Notification Payloads

### Example: Overspending Alert

```json
{
  "userId": "abc123",
  "type": "OVERSPENDING_ALERT",
  "details": [
    { "category": "Food", "limit": 1000, "spent": 1500 }
  ]
}
```

### Example: Inactivity Alert

```json
{
  "userId": "abc123",
  "type": "INACTIVITY_ALERT",
  "message": "No expenses logged in the last 5 days"
}
```

---

## 📦 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/PersonalFinanceTracker_BE.git
cd PersonalFinanceTracker_BE.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment** (`.env`)

```
DATABASE_URL=postgresql://your_user:your_pass@localhost:5432/your_db
```

4. **Run migrations & generate Prisma client**

```bash
npx prisma migrate dev
npx prisma generate
```

5. **Start server**

```bash
npm run dev
```

---

## 📽 Video Walkthrough

---

## 📌 Notes

Check `design_notes.md` for:

- Architecture & design decisions
- Prisma schema explanation
- User scoring logic
- Notification engine details
- Trade-offs & future improvements




