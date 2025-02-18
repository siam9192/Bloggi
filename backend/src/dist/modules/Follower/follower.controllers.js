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
const http_status_1 = __importDefault(require("../../shared/http-status"));
const response_1 = require("../../shared/response");
const follower_service_1 = __importDefault(require("./follower.service"));
const pick_1 = __importDefault(require("../../utils/pick"));
const constant_1 = require("../../utils/constant");
const createFollower = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follower_service_1.default.createFollowerInto(
      req.user,
      req.body,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Follower created successfully",
      data: result,
    });
  }),
);
const deleteFollower = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follower_service_1.default.deleteFollowerFromDB(
      req.user,
      req.params.authorId,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Follower deleted successfully",
      data: result,
    });
  }),
);
const getAuthorFollowers = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filterData = (0, pick_1.default)(req.query, ["name"]);
    const paginationOptions = (0, pick_1.default)(
      req.query,
      constant_1.paginationOptionKeys,
    );
    const result = yield follower_service_1.default.getAuthorFollowersFromDB(
      req.params.authorId,
      filterData,
      paginationOptions,
    );
    (0, response_1.sendSuccessResponse)(
      res,
      Object.assign(
        {
          statusCode: http_status_1.default.OK,
          message: "Followers retrieved successfully",
        },
        result,
      ),
    );
  }),
);
const getMyFollowers = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filterData = (0, pick_1.default)(req.query, [
      "searchTerm",
      "followerSince",
      "status",
    ]);
    const paginationOptions = (0, pick_1.default)(
      req.query,
      constant_1.paginationOptionKeys,
    );
    const result = yield follower_service_1.default.getMyFollowersFromDB(
      req.user,
      filterData,
      paginationOptions,
    );
    (0, response_1.sendSuccessResponse)(
      res,
      Object.assign(
        {
          statusCode: http_status_1.default.OK,
          message: "Followers retrieved successfully",
        },
        result,
      ),
    );
  }),
);
const getMyFollowingAuthors = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(
      req.query,
      constant_1.paginationOptionKeys,
    );
    const result = yield follower_service_1.default.getMyFollowingAuthorsFromDB(
      req.user,
      paginationOptions,
    );
    (0, response_1.sendSuccessResponse)(
      res,
      Object.assign(
        {
          statusCode: http_status_1.default.OK,
          message: "Following authors retrieved successfully",
        },
        result,
      ),
    );
  }),
);
const changeFollowerStatus = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follower_service_1.default.changeFollowerStatus(
      req.user,
      req.body,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Follower status changed successfully",
      data: result,
    });
  }),
);
const FollowerControllers = {
  createFollower,
  deleteFollower,
  getAuthorFollowers,
  getMyFollowers,
  getMyFollowingAuthors,
  changeFollowerStatus,
};
exports.default = FollowerControllers;
