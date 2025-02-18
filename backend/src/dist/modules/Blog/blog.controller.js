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
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const response_1 = require("../../shared/response");
const http_status_1 = __importDefault(require("../../shared/http-status"));
const blog_service_1 = __importDefault(require("./blog.service"));
const pick_1 = __importDefault(require("../../utils/pick"));
const constant_1 = require("../../utils/constant");
const function_1 = require("../../utils/function");
const createBlog = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const result = yield blog_service_1.default.createBlogIntoDB(
      userId,
      req.body,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.CREATED,
      message: "Blog created successful",
      data: result,
    });
  }),
);
const getBlogs = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, pick_1.default)(req.query, [
      "searchTerm",
      "categories",
      "type",
      "startDate",
      "endDate",
    ]);
    const options = (0, pick_1.default)(
      req.query,
      constant_1.paginationOptionKeys,
    );
    const result = yield blog_service_1.default.getBlogsFromDB(
      req.user,
      query,
      options,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blogs retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }),
);
const getMyBlogs = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, pick_1.default)(req.query, [
      "searchTerm",
      "categories",
      "status",
      "startDate",
      "endDate",
      "type",
    ]);
    const options = (0, pick_1.default)(
      req.query,
      constant_1.paginationOptionKeys,
    );
    const result = yield blog_service_1.default.getMyBlogsFromDB(
      req.user,
      query,
      options,
    );
    (0, response_1.sendSuccessResponse)(
      res,
      Object.assign(
        {
          statusCode: http_status_1.default.OK,
          message: "Author Blogs retrieved successfully",
        },
        result,
      ),
    );
  }),
);
const getBlogById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.getBlogByIdFromDB(
      req.user,
      req.params.id,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blog retrieved successfully",
      data: result,
    });
  }),
);
const getBlogForReadBySlug = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.getBlogForReadBySlugFromDB(
      req.user,
      req.params.slug,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blog retrieved successfully",
      data: result,
    });
  }),
);
const getBlogsForManage = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(req.query, [
      "searchTerm",
      "categories",
      "status",
      "startDate",
      "endDate",
    ]);
    const options = (0, function_1.getPaginationOptions)(req.query);
    const result = yield blog_service_1.default.getBlogsForManageFromDB(
      filter,
      options,
    );
    (0, response_1.sendSuccessResponse)(
      res,
      Object.assign(
        {
          statusCode: http_status_1.default.OK,
          message: "Blogs retrieved successfully",
        },
        result,
      ),
    );
  }),
);
const getRecentBlogs = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.getRecentBlogsFromDB();
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blogs retrieved successfully",
      data: result,
    });
  }),
);
const getTrendingBlogs = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.getTrendingBlogsFromDB(
      req.params.categoryId,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blogs retrieved successfully",
      data: result,
    });
  }),
);
const deleteBlogById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.deleteBlogByIdFromDB(
      req.params.id,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blog deleted successfully",
      data: result,
    });
  }),
);
const updateBlogById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.updateBlogByIdFromDB(
      req.params.id,
      req.body,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blog deleted successfully",
      data: result,
    });
  }),
);
const getBlogStates = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.getBlogStatesFromDB(
      req.params.id,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blog states retrieved successfully",
      data: result,
    });
  }),
);
const getRelatedBlogs = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.getRelatedBlogsFromDB(
      req.params.slug,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Blogs retrieved successfully",
      data: result,
    });
  }),
);
const BlogControllers = {
  createBlog,
  getBlogs,
  getRecentBlogs,
  getTrendingBlogs,
  getMyBlogs,
  getBlogsForManage,
  getBlogById,
  getBlogForReadBySlug,
  getRelatedBlogs,
  deleteBlogById,
  updateBlogById,
  getBlogStates,
};
exports.default = BlogControllers;
