/*
  Warnings:

  - You are about to drop the column `user_id` on the `comments` table. All the data in the column will be lost.
  - Added the required column `reader_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "user_id",
ADD COLUMN     "reader_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_reader_id_fkey" FOREIGN KEY ("reader_id") REFERENCES "readers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
