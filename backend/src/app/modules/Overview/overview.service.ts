import { BlogStatus, UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";
import { blogsResultFormat } from "../Blog/blog.constant";

const getAllOverviewDataFromDB = async () => {
  const userWhereConditions = {
    status: {
      not: UserStatus.Deleted,
    },
  };
  const totalUsers = await prisma.user.count({
    where: userWhereConditions,
  });

  const totalReaders = await prisma.reader.count({
    where: {
      user: userWhereConditions,
    },
  });

  const totalStaffs = await prisma.reader.count({
    where: {
      user: userWhereConditions,
    },
  });

  const totalBlockedUsers = await prisma.user.count({
    where: {
      status: UserStatus.Blocked,
    },
  });

  const totalBlogs = await prisma.blog.count({
    where: {
      status: BlogStatus.Published,
    },
  });

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 2);
  const endDate = new Date();

  const recentBlogs = await prisma.blog.findMany({
    where: {
      status: BlogStatus.Published,
      publish_date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
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

  const recentUsers = await prisma.user.findMany({
    where: {
      join_date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      reader: true,
      author: true,
      staff: true,
    },
  });

  const recentUsersData = recentUsers.map((user) => {
    const role = user.role;
    return {
      id: user.id,
      email: user.email,
      role,
      status: user.status,
      join_date: user.join_date,
      profile:
        role === "Author"
          ? user.author
          : role === "Reader"
            ? user.reader
            : user.staff,
    };
  });

  const currentDate = new Date();
  currentDate.setMonth(-12);

  const postingBlogsAnalyze = await prisma.$queryRaw`SELECT 
  EXTRACT(MONTH FROM publish_date) AS month,
  EXTRACT(YEAR FROM publish_date) AS year,
  COUNT(*) AS count
FROM blogs
GROUP BY EXTRACT(MONTH FROM publish_date), EXTRACT(YEAR FROM publish_date)
ORDER BY year, month;
`;

  return {
    totalUsers,
    totalReaders,
    totalStaffs,
    totalBlockedUsers,
    totalBlogs,
    recentBlogs,
    recentUsers: recentUsersData,
    postingBlogsAnalyze,
  };
};

const getAuthorOverviewDataFromDB = async (authUser: IAuthUser) => {
  const totalBlogs = await prisma.blog.count({
    where: {
      author_id: authUser.authorId,
    },
  });
  const totalScheduledBlogs = await prisma.blog.count({
    where: {
      OR: [
        {
          status: BlogStatus.Published,
        },
        {
          publish_date: {
            lte: new Date(),
          },
        },
      ],
      author_id: authUser.authorId,
    },
  });
  const totalBlogViews = await prisma.blog.aggregate({
    where: {
      author_id: authUser.authorId,
    },
    _sum: {
      views_count: true,
    },
  });

  const totalFollowers = await prisma.follower.count({
    where: {
      author_id: authUser.id,
    },
  });

  const recentDate = new Date();

  recentDate.setDate(new Date().getDate() - 3);

  let popularBlogs: any = await prisma.blog.findMany({
    where: {
      author_id: authUser.authorId,
      status: BlogStatus.Published,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      _count: true,
    },

    take: 6,
  });

  popularBlogs = blogsResultFormat(popularBlogs);

  const newFollowers = await prisma.follower.findMany({
    where: {
      author_id: authUser.authorId,
      created_at: {
        gte: recentDate,
      },
    },
    include: {
      reader: {
        select: {
          first_name: true,
          last_name: true,
          profile_photo: true,
        },
      },
    },
  });

  return {
    totalBlogs,
    totalScheduledBlogs,
    totalBlogViews: totalBlogViews._sum.views_count,
    totalFollowers,
    popularBlogs,
    newFollowers,
  };
};

const OverviewServices = {
  getAllOverviewDataFromDB,
  getAuthorOverviewDataFromDB,
};

export default OverviewServices;
