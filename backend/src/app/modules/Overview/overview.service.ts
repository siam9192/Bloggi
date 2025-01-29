import { BlogStatus, UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";

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

const OverviewServices = {
  getAllOverviewDataFromDB,
};

export default OverviewServices;
