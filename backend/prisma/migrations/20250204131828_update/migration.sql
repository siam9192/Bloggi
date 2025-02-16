-- CreateEnum
CREATE TYPE "FollowerStatus" AS ENUM ('Active', 'Blocked');

-- AlterEnum
ALTER TYPE "BlogStatus" ADD VALUE 'Scheduled';

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "followers" ADD COLUMN     "status" "FollowerStatus" NOT NULL DEFAULT 'Active';
