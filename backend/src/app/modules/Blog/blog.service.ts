import {
  BlogPrivacyStatus,
  BlogStatus,
  Prisma,
  UserRole,
} from "@prisma/client";
import prisma from "../../shared/prisma";
import {
  IBlogFilterOptions,
  ICreateBlogPayload,
  IUpdateBlogData,
} from "./blog.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { calculatePagination } from "../../helpers/paginationHelper";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import { IAuthUser } from "../Auth/auth.interface";
import { blogsResultFormat } from "./blog,constant";
import { generateSlug, validateDate } from "../../utils/function";

const createBlogIntoDB = async (
  userId: number,
  payload: ICreateBlogPayload,
) => {
  const authorData = await prisma.author.findUniqueOrThrow({
    where: {
      user_id: userId,
    },
  });

  const { tags, ...othersBlogData } = payload;

  // Check category existence
  await prisma.category.findUniqueOrThrow({
    where: {
      id: othersBlogData.category_id,
    },
  });

  let slug = generateSlug(payload.title);
  // Generate unique slug
  let counter = 1;
  do {
    const blog = await prisma.blog.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });
    if (!blog) {
      break;
    }
    counter++;
    slug = generateSlug(payload.title + " " + counter);
  } while (true);

  const result = await prisma.$transaction(async (trClient) => {
    othersBlogData.publish_date = new Date();

    // Create blog
    const createdBlog = await trClient.blog.create({
      data: {
        author_id: authorData.id,
        ...othersBlogData,
        slug,
      },
    });

    const tags = payload.tags.map((tag) => ({
      name: tag,
      blog_id: createdBlog.id,
    }));

    // Create blog tags
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
  filter: IBlogFilterOptions,
  options: IPaginationOptions,
) => {
  const { searchTerm, categories, type } = filter;

  const { limit, skip, page } = calculatePagination(options);

  const andConditions: Prisma.BlogWhereInput[] = [];

  if (categories) {
    const categorySlugs = categories.split(",");
    if (categorySlugs.length) {
      andConditions.push({
        category: {
          slug: {
            in: categorySlugs,
          },
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

  if (type && ["premium", "free"].includes(type)) {
    andConditions.push({
      is_premium: type === "free" ? false : true,
    });
  }
  const whereConditions: Prisma.BlogWhereInput = {
    AND: andConditions,
    privacy_status: BlogPrivacyStatus.Public,
  };

  const data = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
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
      slug: item.slug,
      likes_count: item.likes_count,
      dislikes_count: item.dislikes_count,
      category: item.category.name,
      author: {
        full_name: author.first_name + " " + author.last_name,
        profile_photo: author.profile_photo,
      },
      is_premium: item.is_premium,
      publish_date: item.publish_date,
      created_at: item.created_at,
    };
  });

  const total = await prisma.blog.count({
    where: whereConditions,
  });

  const meta = {
    page,
    limit,
    total,
  };

  return {
    data: result,
    meta,
  };
};

const getBlogForReadBySlugFromDB = async (
  authUser: IAuthUser,
  slug: string,
) => {
  // Find blog by slug
  const blog = await prisma.blog.findUnique({
    where: {
      slug,
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

  // Check is user role is reader and is the blog is premium
  if (authUser && authUser.role === UserRole.Reader) {
    const reader = await prisma.reader.findUnique({
      where: {
        user_id: authUser.id,
      },
    });
    if (!reader)
      throw new AppError(httpStatus.BAD_REQUEST, "Something went wrong");

    if (blog.is_premium) {
      const currentSubscription = await prisma.subscription.findFirst({
        where: {
          reader: {
            user_id: authUser.id,
          },
          start_at: {
            gt: new Date(),
          },
          end_at: {
            lt: new Date(),
          },
          status: "Active",
        },
      });

      if (!currentSubscription) {
        throw new AppError(
          httpStatus.NOT_ACCEPTABLE,
          "This is premium content.It only for premium members",
        );
      }
    }

    // Upsert blog history
    await prisma.blogReadHistory.upsert({
      where: {
        reader_id_blog_id: {
          reader_id: reader.id,
          blog_id: blog.id,
        },
      },
      create: {
        reader_id: reader.id,
        blog_id: blog.id,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });
  }

  // Increment  blog view (+1)
  await prisma.blog.update({
    where: {
      id: blog.id,
    },
    data: {
      views_count: {
        increment: 1,
      },
    },
  });

  return blog;
};

const getMyBlogsFromDB = async (
  authUser: IAuthUser,
  filterOptions: IBlogFilterOptions,
  options: IPaginationOptions,
) => {
  const {
    searchTerm,
    categories,
    type,
    startDate,
    endDate,
    ...otherFilterOptions
  } = filterOptions;

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

  if (type && ["premium", "free"].includes(type)) {
    andConditions.push({
      is_premium: type === "free" ? false : true,
    });
  }

  if (startDate || endDate) {
    if (
      startDate &&
      validateDate(startDate) &&
      endDate &&
      validateDate(endDate)
    ) {
      andConditions.push({
        created_at: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      });
    } else if (startDate && validateDate(startDate)) {
      andConditions.push({
        created_at: {
          gte: new Date(startDate),
        },
      });
    } else if (endDate && validateDate(endDate)) {
      andConditions.push({
        created_at: {
          lte: new Date(endDate),
        },
      });
    }
  }
  const whereConditions: Prisma.BlogWhereInput = {
    AND: andConditions,
  };

  const blogs = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
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

const getBlogsForManageFromDB = async (
  query: IBlogFilterOptions,
  options: IPaginationOptions,
) => {
  const { searchTerm, categories, startDate, endDate, status, type } = query;

  const { limit, skip, page } = calculatePagination(options);

  const andConditions: Prisma.BlogWhereInput[] = [];

  if (categories) {
    const categorySlugs = categories.split(",");
    if (categorySlugs.length) {
      andConditions.push({
        category: {
          slug: {
            in: categorySlugs,
          },
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
  if (status && Object.values(BlogStatus).includes(status)) {
    andConditions.push({
      status,
    });
  }

  if (type && ["premium", "free"].includes(type)) {
    andConditions.push({
      is_premium: type === "free" ? false : true,
    });
  }

  if (startDate || endDate) {
    const validate = (date: string) => {
      return !isNaN(new Date(date).getTime());
    };

    if (startDate && validate(startDate) && endDate && validate(endDate)) {
      andConditions.push({
        created_at: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      });
    } else if (startDate && validate(startDate)) {
      andConditions.push({
        created_at: {
          gte: new Date(startDate),
        },
      });
    } else if (endDate && validate(endDate)) {
      andConditions.push({
        created_at: {
          lte: new Date(endDate),
        },
      });
    }
  }

  const whereConditions: Prisma.BlogWhereInput = {
    AND: andConditions,
  };

  const data = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
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
      slug: item.slug,
      likes_count: item.likes_count,
      dislikes_count: item.dislikes_count,
      category: item.category.name,
      author: {
        full_name: author.first_name + " " + author.last_name,
        profile_photo: author.profile_photo,
      },
      created_at: item.created_at,
    };
  });

  const total = await prisma.blog.count({
    where: whereConditions,
  });

  const meta = {
    page,
    limit,
    total,
  };

  return {
    data: result,
    meta,
  };
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
      status: "Published",
    },
    include: {
      author: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    take: 12,
    orderBy: {
      publish_date: "desc",
    },
  });
  const result = blogsResultFormat(blogs as any);
  return result;
};

const getTrendingBlogsFromDB = async (categoryId: string | number) => {
  // Typecast category id string => number
  categoryId = Number(categoryId);
  console.log(categoryId);

  const whereConditions: Prisma.BlogWhereInput = {
    publish_date: {
      lte: new Date(),
    },
    status: "Published",
  };

  if (categoryId && typeof categoryId === "number") {
    whereConditions.category_id = categoryId;
  }

  const blogs = await prisma.blog.findMany({
    where: whereConditions,
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
    },
    take: 12,
    orderBy: {
      views_count: "desc",
    },
  });
  const result = blogsResultFormat(blogs as any);
  return result;
};

const getBlogAnalyzingDataFromDB = async (id: string | number) => {
  id = Number(id);

  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  if (!blog) throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
};

const BlogServices = {
  createBlogIntoDB,
  getBlogsFromDB,
  getBlogForReadBySlugFromDB,
  deleteBlogByIdFromDB,
  updateBlogByIdFromDB,
  getMyBlogsFromDB,
  getBlogsForManageFromDB,
  getRecentBlogsFromDB,
  getTrendingBlogsFromDB,
};

export default BlogServices;
