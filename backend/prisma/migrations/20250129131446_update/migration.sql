/*
  Warnings:

  - Added the required column `planData` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "planData" JSONB NOT NULL;
