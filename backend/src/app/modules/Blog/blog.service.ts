import { Blog, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import {
  IBlogFilterOptions,
  ICreateBlogData,
  IUpdateBlogData,
} from "./blog.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { calculatePagination } from "../../helpers/paginationHelper";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import { IAuthUser } from "../Auth/auth.interface";
import { blogsResultFormat } from "./blog,constant";

const createBlogIntoDB = async (userId: number, data: ICreateBlogData) => {
  const authorData = await prisma.author.findUniqueOrThrow({
    where: {
      user_id: userId,
    },
  });

  const { tags, ...othersBlogData } = data;

  // Check category existence
  await prisma.category.findUniqueOrThrow({
    where: {
      id: othersBlogData.category_id,
    },
  });

  const result = await prisma.$transaction(async (trClient) => {
    othersBlogData.publish_date = new Date();
    othersBlogData.category_id = 1;
    const createdBlog = await trClient.blog.create({
      data: {
        author_id: authorData.id,
        ...othersBlogData,
      },
    });

    const tags = data.tags.map((tag) => ({
      name: tag,
      blog_id: createdBlog.id,
    }));

    const createdBlogs = await trClient.blogTag.createMany({
      data: tags,
    });

    return {
      ...createdBlog,
      tags: createdBlogs,
    };
  });

  return result;
};

const getBlogsFromDB = async (
  query: IBlogFilterOptions,
  options: IPaginationOptions,
) => {
  const { searchTerm, categories } = query;

  const { limit, skip } = calculatePagination(options);

  const andConditions: Prisma.BlogWhereInput[] = [];

  if (categories) {
    const categoryIds = categories
      .split(",")
      .map((id) => Number(id))
      .filter((id) => typeof id === "number");
    if (categoryIds.length) {
      andConditions.push({
        category_id: {
          in: categoryIds,
        },
      });
    }
  }

  if (searchTerm) {
    const blogSearchableFields = ["title", "short_description"];
    andConditions.push({
      OR: [
        ...blogSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
        {
          tags: {
            some: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    });
  }
  const whereConditions: Prisma.BlogWhereInput = {
    AND: andConditions,
  };

  const data = await prisma.blog.findMany({
    where: whereConditions,
    // select:{
    //   title:true,
    //   short_description:true,
    //   featured_image:true,
    //   likes_count:true,
    //   dislikes_count:true
    // },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.orderBy
        ? { [options.sortBy]: options.orderBy }
        : {
            publish_date: "desc",
          },
    include: {
      author: {
        select: {
          first_name: true,
          last_name: true,
          profile_photo: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      tags: true,
    },
  });

  const result = data.map((item) => {
    const author = item.author;
    return {
      title: item.title,
      short_description: item.short_description,
      featured_image: item.featured_image,
      likes_count: item.likes_count,
      dislikes_count: item.dislikes_count,
      category: item.category.name,
      author: {
        full_name: author.first_name + " " + author.last_name,
        profile_photo: author.profile_photo,
      },
    };
  });

  return result;
};

const getBlogForReadByIdFromDB = async (
  // user: IAuthUser,
  id: string | number,
) => {
  id = Number(id);

  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          first_name: true,
          last_name: true,
          profile_photo: true,
        },
      },
    },
  });

  //  Check blog existence
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  // // Check is user role is reader and is the blog is premium
  // if (user.role === "Reader" && blog.is_premium) {
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id,
  //     },
  //     include: {
  //       subscriptions: {
  //         orderBy: {
  //           created_at: "desc",
  //         },
  //         take:1
  //       },
  //     },
  //   });

  //   const latest_subscription =  user?.subscriptions[0]
  // }

  await prisma.blog.update({
    where: {
      id,
    },
    data: {
      views_count: {
        increment: 1,
      },
    },
  });

  return blog;
};

const getAuthorAllBlogsFromDB = async (
  authUser: IAuthUser,
  filterOptions: IBlogFilterOptions,
  options: IPaginationOptions,
) => {
  const { searchTerm, categories, ...otherFilterOptions } = filterOptions;

  const { limit, skip } = calculatePagination(options);

  const andConditions: Prisma.BlogWhereInput[] = [
    {
      author: {
        user_id: authUser.id,
      },
    },
  ];

  if (categories) {
    const categoryIds = categories
      .split(",")
      .map((id) => Number(id))
      .filter((id) => typeof id === "number");
    if (categoryIds.length) {
      andConditions.push({
        category_id: {
          in: categoryIds,
        },
      });
    }
  }

  if (searchTerm) {
    const blogSearchableFields = ["title", "short_description"];
    andConditions.push({
      OR: [
        ...blogSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
        {
          tags: {
            some: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    });
  }

  Object.entries(otherFilterOptions).forEach(([key, value]) => {
    andConditions.push({
      [key]: value,
    });
  });

  const whereConditions: Prisma.BlogWhereInput = {
    AND: andConditions,
  };

  const blogs = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.orderBy
        ? { [options.sortBy]: options.orderBy }
        : {
            publish_date: "desc",
          },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const result = blogsResultFormat(blogs);

  return result;
};

const updateBlogByIdFromDB = async (
  id: number | string,
  data: IUpdateBlogData,
) => {
  // Typecast the id string => number
  id = Number(id);

  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          first_name: true,
          last_name: true,
          profile_photo: true,
        },
      },
    },
  });

  //  Check blog existence
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const { deleted_tags, new_tags, ...others_data } = data;
  await prisma.$transaction(async (txClient) => {
    if (deleted_tags && deleted_tags.length) {
      await txClient.blogTag.deleteMany({
        where: {
          id: {
            in: deleted_tags,
          },
        },
      });
    }

    if (new_tags && new_tags.length) {
      await txClient.blogTag.createMany({
        data: new_tags.map((tag) => ({
          blog_id: id,
          name: tag,
        })),
      });
    }

    if (others_data.category_id) {
      await txClient.category.findUniqueOrThrow({
        where: {
          id: others_data.category_id,
        },
      });
    }

    await txClient.blog.update({
      where: {
        id,
      },
      data: others_data,
    });
    return await txClient.blog.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
  });
};

const deleteBlogByIdFromDB = async (id: number | string) => {
  // Typecast the id string => number
  id = Number(id);
  await prisma.blog.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return await prisma.blog.delete({
    where: {
      id,
    },
  });
};

const getRecentBlogsFromDB = async () => {
  const blogs = await prisma.blog.findMany({
    where: {
      publish_date: {
        lte: new Date(),
      },
      status:'Published'
    },
    include:{
      author:true,
      category:{
        select:{
          name:true
        }
      }
    },
    take: 12,
    orderBy: {
      publish_date: "desc",
    },
  });
  const result = blogsResultFormat(blogs as any)
  return result
};

const getTrendingBlogsFromDB = async (categoryId:string|number) => {
  // Typecast category id string => number
  categoryId = Number(categoryId)
  console.log(categoryId)
 
  const whereConditions:Prisma.BlogWhereInput = {
    publish_date: {
      lte: new Date(),
    },
    status:'Published'
  }

  if(categoryId && typeof categoryId  === 'number'){
    whereConditions.category_id = categoryId
  }


  const blogs = await prisma.blog.findMany({
    where:whereConditions,
    include:{
      author:{
        select:{
          first_name:true,
          last_name:true,
          profile_photo:true
        }
      },
      category:{
        select:{
          name:true
        }
      }
    },
    take: 12,
    orderBy: {
      views_count: "desc",
    },
    
  });
 const result = blogsResultFormat(blogs as any)
  return result
};



const BlogService = {
  createBlogIntoDB,
  getBlogsFromDB,
  getBlogForReadByIdFromDB,
  deleteBlogByIdFromDB,
  updateBlogByIdFromDB,
  getAuthorAllBlogsFromDB,
  getRecentBlogsFromDB,
  getTrendingBlogsFromDB
};

export default BlogService;
