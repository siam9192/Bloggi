-- AlterTable
ALTER TABLE "readers" ALTER COLUMN "profile_photo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'Active';
