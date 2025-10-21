/*
  Warnings:

  - You are about to drop the column `number_of_winners` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Draw" ADD COLUMN     "number_of_winners" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "number_of_winners";
