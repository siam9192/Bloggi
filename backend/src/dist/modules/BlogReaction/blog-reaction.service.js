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
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const UpsertBlogReactionIntoDB = (authUser, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const reader = yield prisma_1.default.reader.findFirst({
      where: {
        user_id: authUser.id,
      },
      select: {
        id: true,
      },
    });
    //   Check reader existence
    if (!reader) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        "Profile not found",
      );
    }
    const blog = yield prisma_1.default.blog.findUnique({
      where: {
        id: payload.blog_id,
      },
      select: {
        id: true,
      },
    });
    if (!blog) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        "Blog not found",
      );
    }
    let result;
    if (payload.type === null) {
      yield prisma_1.default.blogReaction.delete({
        where: {
          blog_id_reader_id: {
            reader_id: reader.id,
            blog_id: payload.blog_id,
          },
        },
      });
      result = null;
    } else {
      result = yield prisma_1.default.blogReaction.upsert({
        where: {
          blog_id_reader_id: {
            blog_id: payload.blog_id,
            reader_id: reader.id,
          },
        },
        update: {
          type: payload.type,
        },
        create: {
          reader_id: reader.id,
          blog_id: payload.blog_id,
          type: payload.type,
        },
      });
    }
    return result;
  });
const getMyBlogReactionsFromDB = (authUser, blogId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Type cast blogId  string => number
    blogId = Number(blogId);
    return yield prisma_1.default.blogReaction.findUnique({
      where: {
        blog_id_reader_id: {
          blog_id: blogId,
          reader_id: authUser.readerId,
        },
      },
      select: {
        blog_id: true,
        type: true,
      },
    });
  });
const getBlogReactionsFromDB = (authUser, blogId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Type cast blogId  string => number
    blogId = Number(blogId);
    return yield prisma_1.default.blogReaction.findUnique({
      where: {
        blog_id_reader_id: {
          blog_id: blogId,
          reader_id: authUser.readerId,
        },
      },
      select: {
        blog_id: true,
        type: true,
      },
    });
  });
const BlogReactionServices = {
  UpsertBlogReactionIntoDB,
  getMyBlogReactionsFromDB,
};
exports.default = BlogReactionServices;
