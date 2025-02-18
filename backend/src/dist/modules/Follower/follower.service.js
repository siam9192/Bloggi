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
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const function_1 = require("../../utils/function");
const createFollowerInto = (user, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const reader = yield prisma_1.default.reader.findUnique({
      where: {
        user_id: user.id,
      },
    });
    // Check user (Reader) existence
    if (!reader) {
      throw new AppError_1.default(
        http_status_1.default.OK,
        "Reader not found",
      );
    }
    const author = yield prisma_1.default.author.findUnique({
      where: {
        id: data.author_id,
      },
    });
    // Check user (Author) existence
    if (!author) {
      throw new AppError_1.default(
        http_status_1.default.OK,
        "Author not found",
      );
    }
    // Assign reader id as a follower
    data.reader_id = reader.id;
    return yield prisma_1.default.follower.create({
      data,
    });
  });
const deleteFollowerFromDB = (user, author_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Typecase author id string => number
    author_id = Number(author_id);
    const follower = yield prisma_1.default.follower.findFirst({
      where: {
        reader: {
          user_id: user.id,
        },
        author_id: author_id,
      },
    });
    // Check follower existence
    if (!follower) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        "Follower not found",
      );
    }
    yield prisma_1.default.follower.deleteMany({
      where: {
        reader: {
          user_id: user.id,
        },
        author_id: author_id,
      },
    });
    return null;
  });
const getAuthorFollowersFromDB = (authorId, filterData, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Type cast author id string => number
    authorId = Number(authorId);
    const { limit, skip, page } = (0, paginationHelper_1.calculatePagination)(
      options,
    );
    const whereConditions = {};
    if (filterData.searchTerm) {
      whereConditions;
    }
    const data = yield prisma_1.default.follower.findMany({
      where: whereConditions,
      include: {
        reader: {
          select: {
            first_name: true,
            last_name: true,
            profile_photo: true,
          },
        },
      },
      take: limit,
      skip,
    });
    const total = yield prisma_1.default.follower.count({
      where: whereConditions,
    });
    return {
      data,
      meta: {
        limit,
        page,
        total,
      },
    };
  });
const getMyFollowersFromDB = (authUser, filter, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page, sortBy, sortOrder } = (0,
    paginationHelper_1.calculatePagination)(options);
    const { searchTerm: name, followerSince, status } = filter;
    const andConditions = [];
    if (name) {
      const [firstName, lastName] = name.split(" ");
      const filObj = {};
      if (firstName) {
        filObj.first_name = firstName;
      }
      if (lastName) {
        filObj.last_name = lastName;
      }
      andConditions.push({
        reader: filObj,
      });
    }
    if (followerSince && (0, function_1.validateDate)(followerSince)) {
      andConditions.push({
        created_at: {
          gte: new Date(followerSince),
        },
      });
    }
    if (status && Object.values(client_1.FollowerStatus).includes(status)) {
      andConditions.push({
        status,
      });
    }
    const whereConditions = {
      author: {
        user_id: authUser.id,
      },
      AND: andConditions,
    };
    const data = yield prisma_1.default.follower.findMany({
      where: whereConditions,
      include: {
        reader: {
          select: {
            first_name: true,
            last_name: true,
            profile_photo: true,
          },
        },
      },
      take: limit,
      skip,
      orderBy:
        sortBy === "name"
          ? {
              reader: {
                first_name: sortOrder,
              },
            }
          : {
              [sortBy]: sortOrder,
            },
    });
    const total = yield prisma_1.default.follower.count({
      where: whereConditions,
    });
    const formatData = data.map((item) => ({
      reader_id: item.reader_id,
      full_name: item.reader.first_name + " " + item.reader.last_name,
      profile_photo: item.reader.profile_photo,
      status: item.status,
      created_at: item.created_at,
    }));
    return {
      data: formatData,
      meta: {
        limit,
        page,
        total,
      },
    };
  });
const getMyFollowingAuthorsFromDB = (authUser, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, paginationHelper_1.calculatePagination)(
      paginationOptions,
    );
    const whereConditions = {
      reader: {
        user_id: authUser.id,
      },
    };
    const data = yield prisma_1.default.follower.findMany({
      where: whereConditions,
      take: limit,
      skip,
    });
    const total = yield prisma_1.default.follower.count({
      where: whereConditions,
    });
    return {
      data,
      meta: {
        limit,
        page,
        total,
      },
    };
  });
const changeFollowerStatus = (authUser, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const follower = yield prisma_1.default.follower.findUnique({
      where: {
        reader_id_author_id: {
          reader_id: payload.reader_id,
          author_id: authUser.authorId,
        },
      },
    });
    if (!follower)
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        "Follower not found",
      );
    yield prisma_1.default.follower.update({
      where: {
        reader_id_author_id: {
          reader_id: payload.reader_id,
          author_id: authUser.authorId,
        },
      },
      data: {
        status: payload.status,
      },
    });
    return null;
  });
const FollowerServices = {
  createFollowerInto,
  deleteFollowerFromDB,
  getAuthorFollowersFromDB,
  getMyFollowersFromDB,
  getMyFollowingAuthorsFromDB,
  changeFollowerStatus,
};
exports.default = FollowerServices;
