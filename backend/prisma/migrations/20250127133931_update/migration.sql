/*
  Warnings:

  - Added the required column `validity_days` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "validity_days" INTEGER NOT NULL;
