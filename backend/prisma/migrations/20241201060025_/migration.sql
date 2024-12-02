/*
  Warnings:

  - The values [Available,Unavailable] on the enum `PackageFeatureStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PackageFeatureStatus_new" AS ENUM ('Included', 'Not_Included');
ALTER TABLE "package_features" ALTER COLUMN "status" TYPE "PackageFeatureStatus_new" USING ("status"::text::"PackageFeatureStatus_new");
ALTER TYPE "PackageFeatureStatus" RENAME TO "PackageFeatureStatus_old";
ALTER TYPE "PackageFeatureStatus_new" RENAME TO "PackageFeatureStatus";
DROP TYPE "PackageFeatureStatus_old";
COMMIT;
