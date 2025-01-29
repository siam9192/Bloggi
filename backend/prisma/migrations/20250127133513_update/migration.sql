/*
  Warnings:

  - The values [SSL] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `package_id` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the `package_features` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `packages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `plan_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlanDiscountType" AS ENUM ('Percentage', 'Fixed');

-- CreateEnum
CREATE TYPE "PlanFeatureStatus" AS ENUM ('Included', 'Not_Included');

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('Stripe', 'Paypal', 'SSLCommerz', 'Bkash', 'Nagad');
ALTER TABLE "payments" ALTER COLUMN "method" TYPE "PaymentMethod_new" USING ("method"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "package_features" DROP CONSTRAINT "package_features_package_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_package_id_fkey";

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "package_id",
ADD COLUMN     "plan_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "package_features";

-- DropTable
DROP TABLE "packages";

-- DropEnum
DROP TYPE "PackageDiscountType";

-- DropEnum
DROP TYPE "PackageFeatureStatus";

-- CreateTable
CREATE TABLE "SearchQuery" (
    "query" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "user_id" INTEGER NOT NULL,
    "keyword" TEXT NOT NULL,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("user_id","keyword")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "discount_type" "PlanDiscountType" NOT NULL,
    "validity_days" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_features" (
    "id" SERIAL NOT NULL,
    "plane_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "PlanFeatureStatus" NOT NULL,

    CONSTRAINT "plan_features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchQuery_query_key" ON "SearchQuery"("query");

-- AddForeignKey
ALTER TABLE "plan_features" ADD CONSTRAINT "plan_features_plane_id_fkey" FOREIGN KEY ("plane_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
