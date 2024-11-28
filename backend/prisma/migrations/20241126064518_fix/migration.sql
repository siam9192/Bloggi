/*
  Warnings:

  - Added the required column `privacy_status` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `publish_date` on the `blogs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('Draft', 'Published', 'Archived');

-- CreateEnum
CREATE TYPE "BlogPrivacyStatus" AS ENUM ('Public', 'Private');

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "privacy_status" "BlogPrivacyStatus" NOT NULL,
ADD COLUMN     "status" "BlogStatus" NOT NULL,
DROP COLUMN "publish_date",
ADD COLUMN     "publish_date" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "PostStatus";
