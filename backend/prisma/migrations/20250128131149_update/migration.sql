/*
  Warnings:

  - You are about to drop the column `isFeatured` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "isFeatured",
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false;
