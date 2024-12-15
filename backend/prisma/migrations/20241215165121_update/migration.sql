-- CreateTable
CREATE TABLE "blog_read_histories" (
    "reader_id" INTEGER NOT NULL,
    "blog_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_read_histories_pkey" PRIMARY KEY ("reader_id","blog_id")
);

-- AddForeignKey
ALTER TABLE "blog_read_histories" ADD CONSTRAINT "blog_read_histories_reader_id_fkey" FOREIGN KEY ("reader_id") REFERENCES "readers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_read_histories" ADD CONSTRAINT "blog_read_histories_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
