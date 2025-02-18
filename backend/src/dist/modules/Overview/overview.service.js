"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const blog_constant_1 = require("../Blog/blog.constant");
const getAllOverviewDataFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userWhereConditions = {
      status: {
        not: client_1.UserStatus.Deleted,
      },
    };
    const totalUsers = yield prisma_1.default.user.count({
      where: userWhereConditions,
    });
    const totalReaders = yield prisma_1.default.reader.count({
      where: {
        user: userWhereConditions,
      },
    });
    const totalStaffs = yield prisma_1.default.reader.count({
      where: {
        user: userWhereConditions,
      },
    });
    const totalBlockedUsers = yield prisma_1.default.user.count({
      where: {
        status: client_1.UserStatus.Blocked,
      },
    });
    const totalBlogs = yield prisma_1.default.blog.count({
      where: {
        status: client_1.BlogStatus.Published,
      },
    });
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 2);
    const endDate = new Date();
    const recentBlogs = yield prisma_1.default.blog.findMany({
      where: {
        status: client_1.BlogStatus.Published,
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
    const recentUsers = yield prisma_1.default.user.findMany({
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
    const postingBlogsAnalyze = yield prisma_1.default.$queryRaw`SELECT 
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
  });
const getAuthorOverviewDataFromDB = (authUser) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const totalBlogs = yield prisma_1.default.blog.count({
      where: {
        author_id: authUser.authorId,
      },
    });
    const totalScheduledBlogs = yield prisma_1.default.blog.count({
      where: {
        OR: [
          {
            status: client_1.BlogStatus.Published,
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
    const totalBlogViews = yield prisma_1.default.blog.aggregate({
      where: {
        author_id: authUser.authorId,
      },
      _sum: {
        views_count: true,
      },
    });
    const totalFollowers = yield prisma_1.default.follower.count({
      where: {
        author_id: authUser.id,
      },
    });
    const recentDate = new Date();
    recentDate.setDate(new Date().getDate() - 3);
    let popularBlogs = yield prisma_1.default.blog.findMany({
      where: {
        author_id: authUser.authorId,
        status: client_1.BlogStatus.Published,
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
    popularBlogs = (0, blog_constant_1.blogsResultFormat)(popularBlogs);
    const newFollowers = yield prisma_1.default.follower.findMany({
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
  });
const OverviewServices = {
  getAllOverviewDataFromDB,
  getAuthorOverviewDataFromDB,
};
exports.default = OverviewServices;
