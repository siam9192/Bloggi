-- DropForeignKey
ALTER TABLE "blog_tags" DROP CONSTRAINT "blog_tags_blog_id_fkey";

-- AddForeignKey
ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
