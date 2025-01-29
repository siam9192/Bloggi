import { Author, Blog, BlogTag } from "@prisma/client";

export const blogsResultFormat = (
  blogs: (Blog & {
    category: { name: string };
    author?: Author;
    tags?: BlogTag[];
  })[],
  options?: { author: boolean; tags: boolean },
) => {
  const result: any = blogs.map((blog) => {
    const data = {
      title: blog.title,
      short_description: blog.short_description,
      featured_image: blog.featured_image,
      slug: blog.slug,
      count: {
        likes: blog.likes_count,
        dislikes: blog.dislikes_count,
        views: blog.views_count,
      },
      category: blog.category,
      author: blog.author,
      tags: blog.tags,
      status: blog.status,
      publish_date: blog.publish_date,
    };

    if (options) {
      if (options.author) {
        delete data.author;
      }
      if (options.tags) {
        delete data.tags;
      }
    }
    return data;
  });
  return result;
};
