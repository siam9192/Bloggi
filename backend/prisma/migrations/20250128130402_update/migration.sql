/*
  Warnings:

  - You are about to drop the column `parentId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parentId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "parentId",
ADD COLUMN     "parent_id" INTEGER;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
