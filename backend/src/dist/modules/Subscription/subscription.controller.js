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
const subscription_service_1 = __importDefault(
  require("./subscription.service"),
);
const pick_1 = __importDefault(require("../../utils/pick"));
const constant_1 = require("../../utils/constant");
const purchasePackage = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_service_1.default.initPlanSubscription(
      req.user,
      req.body,
    );
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Payment url retrieved successfully",
      data: result,
    });
  }),
);
const getSubscriptionsFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(req.query, [
      "startDate",
      "endDate",
      "status",
      "userId",
    ]);
    const paginationOptions = (0, pick_1.default)(
      req.query,
      constant_1.paginationOptionKeys,
    );
    const result = yield subscription_service_1.default.getSubscriptionsFromDB(
      filter,
      paginationOptions,
    );
    (0, response_1.sendSuccessResponse)(
      res,
      Object.assign(
        {
          statusCode: http_status_1.default.OK,
          message: "Subscriptions  retrieved successfully",
        },
        result,
      ),
    );
  }),
);
const getMyCurrentSubscription = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield subscription_service_1.default.getMyCurrentSubscription(req.user);
    (0, response_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: "Current Subscription retrieved successfully",
      data: result,
    });
  }),
);
const subscriptionControllers = {
  purchasePackage,
  getSubscriptionsFromDB,
  getMyCurrentSubscription,
};
exports.default = subscriptionControllers;
