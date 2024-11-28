/*
  Warnings:

  - The primary key for the `social_links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `social_links` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `social_links` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `social_links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_id_fkey";

-- AlterTable
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_pkey",
DROP COLUMN "id",
DROP COLUMN "userId",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD CONSTRAINT "social_links_pkey" PRIMARY KEY ("author_id", "platform");

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
