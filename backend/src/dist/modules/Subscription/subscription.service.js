"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const payment_service_1 = __importDefault(require("../Payment/payment.service"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const initPlanSubscription = (authUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield prisma_1.default.plan.findUnique({
        where: {
            id: payload.plan_id,
        },
    });
    // Checking package existence
    if (!plan) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Subscription Package not found");
    }
    const readerSubscriptions = yield prisma_1.default.subscription.findMany({
        where: {
            status: {
                not: "Expired",
            },
            end_at: {
                gt: new Date(),
            },
        },
        orderBy: {
            end_at: "desc",
        },
    });
    const latestSubscription = readerSubscriptions[0];
    //   Check is the user have any  active subscription
    // If active subscription then throw error otherwise go next steps
    let hoursDif = 0;
    if (latestSubscription) {
        const subscriptionExpireTime = new Date(latestSubscription.end_at).getTime();
        const currentTime = new Date().getTime();
        const timeDiff = Math.abs(subscriptionExpireTime - currentTime);
        hoursDif = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours
        if (hoursDif > 48) {
            throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Sorry.you can't purchase any subscription now");
        }
    }
    //   Calculate package price
    const planPrice = plan.price -
        (plan.discount_type === "Fixed"
            ? plan.discount
            : (plan.discount / 100) * plan.price);
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const reader = yield tx.reader.findUnique({
            where: {
                id: authUser.readerId,
            },
            include: {
                user: true,
            },
        });
        if (!reader)
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Bad request something went wrong");
        const paymentPayload = {
            planeName: plan.name,
            amount: planPrice,
            method: payload.method,
            user_id: authUser.id,
            customer: {
                name: reader.first_name + " " + reader.last_name,
                phone: null,
                email: reader.user.email,
            },
        };
        const { transactionId, paymentId, paymentUrl } = yield payment_service_1.default.initSubscriptionPayment(tx, paymentPayload);
        const start_at = new Date();
        const end_at = new Date(new Date().getTime() + hoursDif * 60 * 60 * 1000);
        yield tx.subscription.create({
            data: {
                reader_id: authUser.readerId,
                payment_id: paymentId,
                plan_id: plan.id,
                status: hoursDif > 48
                    ? client_1.SubscriptionStatus.Inactive
                    : client_1.SubscriptionStatus.Active,
                start_at,
                end_at,
                validity_days: plan.validity_days,
                planData: plan,
            },
        });
        return {
            transactionId,
            paymentId,
            paymentUrl,
        };
    }));
    return {
        paymentUrl: result.paymentUrl,
    };
});
const getMyCurrentSubscription = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptions = yield prisma_1.default.subscription.findMany({
        where: {
            reader_id: authUser.readerId,
            status: client_1.SubscriptionStatus.Active,
            payment: {
                status: client_1.PaymentStatus.Success,
            },
            end_at: {
                lte: new Date(),
            },
        },
        orderBy: {
            end_at: "desc",
        },
    });
    const currentSubscription = subscriptions[0];
    return currentSubscription;
});
const getSubscriptionsFromDB = (filter, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const { startDate, endDate, status, readerId } = filter;
    const andConditions = [];
    if (startDate || endDate) {
        const validate = (date) => {
            return !isNaN(new Date(date).getTime());
        };
        if (startDate && validate(startDate) && endDate && validate(endDate)) {
            andConditions.push({
                created_at: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            });
        }
        else if (startDate && validate(startDate)) {
            andConditions.push({
                created_at: {
                    gte: new Date(startDate),
                },
            });
        }
        else if (endDate && validate(endDate)) {
            andConditions.push({
                created_at: {
                    lte: new Date(endDate),
                },
            });
        }
    }
    if (status) {
        andConditions.push({
            status,
        });
    }
    if (readerId) {
        andConditions.push({
            reader_id: parseInt(readerId),
        });
    }
    const whereConditions = {
        AND: andConditions,
    };
    const data = yield prisma_1.default.subscription.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.subscription.count({
        where: whereConditions,
    });
    const meta = {
        page,
        limit,
        total,
    };
    return {
        data,
        meta,
    };
});
const SubscriptionServices = {
    initPlanSubscription,
    getMyCurrentSubscription,
    getSubscriptionsFromDB,
};
exports.default = SubscriptionServices;
