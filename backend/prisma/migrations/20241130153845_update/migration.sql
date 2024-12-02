/*
  Warnings:

  - The primary key for the `comment_reactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `comment_reactions` table. All the data in the column will be lost.
  - Added the required column `reader_id` to the `comment_reactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment_reactions" DROP CONSTRAINT "comment_reactions_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "reader_id" INTEGER NOT NULL,
ADD CONSTRAINT "comment_reactions_pkey" PRIMARY KEY ("reader_id", "comment_id");
