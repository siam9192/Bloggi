/*
  Warnings:

  - You are about to drop the column `expire_at` on the `subscriptions` table. All the data in the column will be lost.
  - Added the required column `end_at` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "expire_at",
ADD COLUMN     "end_at" TIMESTAMP(3) NOT NULL;
