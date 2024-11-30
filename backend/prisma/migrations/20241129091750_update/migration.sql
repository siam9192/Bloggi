/*
  Warnings:

  - The primary key for the `bookmarks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `bookmarks` table. All the data in the column will be lost.
  - Added the required column `blog_id` to the `bookmarks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "blog_id" INTEGER NOT NULL,
ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("blog_id", "user_id");
