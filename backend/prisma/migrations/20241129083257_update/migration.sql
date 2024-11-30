/*
  Warnings:

  - The primary key for the `followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `follower_id` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `following_id` on the `followers` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reader_id` to the `followers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_following_id_fkey";

-- AlterTable
ALTER TABLE "followers" DROP CONSTRAINT "followers_pkey",
DROP COLUMN "follower_id",
DROP COLUMN "following_id",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "reader_id" INTEGER NOT NULL,
ADD CONSTRAINT "followers_pkey" PRIMARY KEY ("reader_id", "author_id");

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_reader_id_fkey" FOREIGN KEY ("reader_id") REFERENCES "readers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
