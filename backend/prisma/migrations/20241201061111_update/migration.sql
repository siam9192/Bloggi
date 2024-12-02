/*
  Warnings:

  - The values [Processing] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `transaction_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('Pending', 'Success', 'Failed', 'Canceled');
ALTER TABLE "payments" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "transaction_id" TEXT NOT NULL;
