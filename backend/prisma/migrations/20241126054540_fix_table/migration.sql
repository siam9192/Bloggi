/*
  Warnings:

  - You are about to drop the column `post_id` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `post_reactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `post_reactions` table. All the data in the column will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blog_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blog_id` to the `post_reactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_reactions" DROP CONSTRAINT "post_reactions_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "post_id",
ADD COLUMN     "blog_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "post_reactions" DROP CONSTRAINT "post_reactions_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "blog_id" INTEGER NOT NULL,
ADD CONSTRAINT "post_reactions_pkey" PRIMARY KEY ("blog_id", "user_id");

-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summery" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "featured_image" TEXT NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "publish_date" TEXT NOT NULL,
    "views_count" INTEGER NOT NULL,
    "likes_count" INTEGER NOT NULL,
    "dislikes_count" INTEGER NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_reactions" ADD CONSTRAINT "post_reactions_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
