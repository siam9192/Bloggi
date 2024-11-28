/*
  Warnings:

  - You are about to drop the column `summery` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `parent_categories` table. All the data in the column will be lost.
  - You are about to drop the `post_reactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `short_description` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `parent_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_reactions" DROP CONSTRAINT "post_reactions_blog_id_fkey";

-- DropForeignKey
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_post_id_fkey";

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "summery",
ADD COLUMN     "short_description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "parent_categories" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "post_reactions";

-- DropTable
DROP TABLE "post_tags";

-- CreateTable
CREATE TABLE "blog_tags" (
    "id" SERIAL NOT NULL,
    "blog_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "blog_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_reactions" (
    "type" "ReactionType" NOT NULL,
    "blog_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "blog_reactions_pkey" PRIMARY KEY ("blog_id","user_id")
);

-- AddForeignKey
ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_reactions" ADD CONSTRAINT "blog_reactions_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
