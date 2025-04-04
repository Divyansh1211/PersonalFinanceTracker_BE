/*
  Warnings:

  - Changed the type of `Date` on the `ExpenseData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ExpenseData" DROP COLUMN "Date",
ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL;
