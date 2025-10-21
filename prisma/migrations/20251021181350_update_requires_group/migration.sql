/*
  Warnings:

  - The `requires_group` column on the `Draw` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Draw" DROP COLUMN "requires_group",
ADD COLUMN     "requires_group" "Group";
