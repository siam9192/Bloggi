"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsResultFormat = void 0;
const blogsResultFormat = (blogs, options) => {
  const result = blogs.map((blog) => {
    const data = {
      id: blog.id,
      title: blog.title,
      short_description: blog.short_description,
      featured_image: blog.featured_image,
      slug: blog.slug,
      _count: {
        likes: blog.likes_count,
        dislikes: blog.dislikes_count,
        views: blog.views_count,
        comments: blog._count.comments,
      },
      category: blog.category,
      author: blog.author,
      tags: blog.tags,
      is_premium: blog.is_premium,
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
exports.blogsResultFormat = blogsResultFormat;
