-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'closed', 'completed');

-- AlterTable
ALTER TABLE "Draw" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';
