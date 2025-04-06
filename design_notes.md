# 📐 Design Notes - Personal Finance Tracker API

## 🧠 System Overview
A modular backend system built with Node.js (Express.js) and PostgreSQL (via Prisma ORM) to help users track expenses, set budgets, get behavior-based scores, and receive notifications.

---

## 🏛️ Architecture
**Tech Stack:**
- **Backend:** Node.js with Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Scheduler:** node-cron
- **Documentation:** Swagger/Postman

**Architecture Highlights:**
- Modular folder structure (`controller/`, `services/`, `utils/`, `middleware/`, `routes/`)
- Separation of concerns: each layer handles its responsibility
- Middleware-based logging, auth, and validation
- Notification system using cron job scheduler

---

## 🗃️ Database Schema Design

### Models
- **User**
  - `id`, `email`, `password`, `role`, `createdAt`, `updatedAt`
  - Relations: Expenses, Budgets

- **Expenses**
  - `id`, `amount`, `category`, `date`, `tags`, `notes`, `userId`

- **Budget**
  - `id`, `userId`, `total_limit`, `category_limit (JSON)`, `month`

- **TransactionLog**
  - Logs every CREATE, UPDATE, DELETE on expense
  - Used for reversal feature

- **ReversalLog**
  - Tracks reversed operations to prevent repeated reversal

---

## 🔢 Scoring Logic
User score is out of 100 and modular:

### 1. Budget Adherence (30%)
- For each category, if the user stays within limits, they score proportionally.
- Overages reduce score accordingly.

### 2. Frequency of Usage (30%)
- Count of days expenses were logged in a month.
- More spread-out usage leads to higher scores.

### 3. Expense Discipline (40%)
- Ratio of expense logging days to total days since signup or in the month.
- Helps reward consistent trackers.

**Why Modular?**
- Easy to plug in new criteria (e.g., savings goal adherence, irregular expenses, etc.)
- Weights can be adjusted without major rewrites

---

## 🛎️ Notification System
Runs via `node-cron` every minute (for dev testing) or daily (at 8AM) in production.

### Scans For:
1. **Overspending Users**
   - Budget's `category_limit` vs sum of expenses
2. **Inactive Users**
   - No expenses logged in the past 5 days

### Notification Payload:
```json
{
  "userId": "user-uuid",
  "type": "OVERSPENDING_ALERT",
  "details": [ { category, limit, spent } ]
}
```

---

## 🧾 Ledger & Reversal
- **TransactionLog** stores snapshots of every expense operation.
- **Reversal** endpoint reverts last CREATE, UPDATE, DELETE by replaying the snapshot.
- **ReversalLog** prevents reversing the same operation more than once.

---
