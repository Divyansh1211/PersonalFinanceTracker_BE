-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Anonymous',
ALTER COLUMN "password" DROP NOT NULL;
