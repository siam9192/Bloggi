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
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const client_1 = require("@prisma/client");
const payment_function_1 = require("./payment.function");
const stripe_service_1 = __importDefault(require("../Stripe/stripe.service"));
const ssl_service_1 = __importDefault(require("../SSL/ssl.service"));
const initSubscriptionPayment = (tx, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction_id = yield (0, payment_function_1.generateTransactionId)();
    const createdPayment = yield tx.payment.create({
        data: {
            transaction_id,
            amount: payload.amount,
            method: payload.method,
            user_id: payload.user_id,
            status: client_1.PaymentStatus.Pending,
        },
    });
    let paymentUrl;
    switch (payload.method) {
        case client_1.PaymentMethod.Stripe:
            const res = yield stripe_service_1.default.createCheckoutSession({
                planName: payload.planeName,
                amount: payload.amount,
                transactionId: transaction_id,
            });
            paymentUrl = res.url;
            break;
        case client_1.PaymentMethod.SSLCommerz:
            const response = yield ssl_service_1.default.createPaymentSession({
                transactionId: transaction_id,
                amount: payload.amount,
                customer: payload.customer,
            });
            paymentUrl = response.GatewayPageURL;
            break;
        default:
            null;
    }
    return {
        paymentId: createdPayment.id,
        transactionId: transaction_id,
        paymentUrl,
    };
});
const validateSSLSubscriptionPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload || !payload.status) {
        return {
            message: "Invalid Payment!",
        };
    }
    if (payload.status === "VALID") {
        const response = yield ssl_service_1.default.validatePayment(payload);
        if ((response === null || response === void 0 ? void 0 : response.status) !== "VALID") {
            return {
                message: "Payment Failed!",
            };
        }
        const payment = yield prisma_1.default.payment.findUnique({
            where: {
                transaction_id: payload.tran_id,
            },
        });
        if (!payment)
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid payment!");
        if (payment.status !== client_1.PaymentStatus.Timeout) {
            yield prisma_1.default.payment.update({
                where: {
                    id: payment.id,
                },
                data: {
                    status: client_1.PaymentStatus.Success,
                },
            });
        }
        else {
        }
    }
    else {
        PaymentServices.manageCanceledOrFailedPayment(payload.tran_id, payload.status);
    }
});
const validateStripeSubscriptionPayment = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event || event.type)
        throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, "Bad request");
    const session = event.data.object;
    const metaData = session.metaData;
    switch (event.type) {
        case "checkout.session.completed":
            const payment = yield prisma_1.default.payment.findUnique({
                where: {
                    transaction_id: metaData.transactionId,
                },
            });
            if (!payment) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid payment");
            }
            if (payment.status !== client_1.PaymentStatus.Timeout) {
                yield prisma_1.default.payment.update({
                    where: {
                        id: payment.id,
                    },
                    data: {
                        status: client_1.PaymentStatus.Success,
                    },
                });
            }
            else {
            }
        case "checkout.session.async_payment_failed":
            yield PaymentServices.manageCanceledOrFailedPayment(metaData.transactionId, "FAILED");
        case "checkout.session.async_payment_failed":
            yield PaymentServices.manageCanceledOrFailedPayment(metaData.transactionId, "FAILED");
        case "checkout.session.expired":
            yield PaymentServices.manageCanceledOrFailedPayment(metaData.transactionId, "EXPIRED");
        default:
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Bad request");
    }
});
const manageCanceledOrFailedPayment = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield prisma_1.default.payment.findUnique({
        where: {
            transaction_id: transactionId,
            status: client_1.PaymentStatus.Pending,
        },
    });
    if (!payment) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Bad request");
    }
    let pStatus;
    switch (status) {
        case "CANCELED":
            pStatus = client_1.PaymentStatus.Canceled;
        case "FAILED":
            pStatus = client_1.PaymentStatus.Failed;
        case "EXPIRED":
            pStatus = client_1.PaymentStatus.Failed;
        case "UNATTEMPTED":
            pStatus = client_1.PaymentStatus.Failed;
    }
    yield prisma_1.default.payment.update({
        where: {
            transaction_id: transactionId,
        },
        data: {
            status: pStatus,
        },
    });
});
const getMyPaymentsFromDB = (authUser, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const whereConditions = {
        user_id: authUser.id,
        status: client_1.PaymentStatus.Success,
    };
    const data = yield prisma_1.default.payment.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.payment.count({
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
const getPaymentsFromDB = (filter, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const andConditions = [];
    const { minAmount, maxAmount, startDate, endDate, status } = filter;
    if (minAmount || maxAmount) {
        const validate = (amount) => {
            return !isNaN(parseInt(amount));
        };
        if (minAmount && validate(minAmount) && maxAmount && validate(maxAmount)) {
            andConditions.push({
                amount: {
                    gte: parseInt(minAmount),
                    lte: parseInt(maxAmount),
                },
            });
        }
        else if (minAmount && validate(minAmount)) {
            andConditions.push({
                amount: {
                    gte: parseInt(minAmount),
                },
            });
        }
        else if (maxAmount && validate(maxAmount)) {
            andConditions.push({
                amount: {
                    lte: parseInt(maxAmount),
                },
            });
        }
    }
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
    const whereConditions = {
        AND: andConditions,
    };
    const data = yield prisma_1.default.payment.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.payment.count({
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
const PaymentServices = {
    initSubscriptionPayment,
    getMyPaymentsFromDB,
    getPaymentsFromDB,
    manageCanceledOrFailedPayment,
    validateStripeSubscriptionPayment,
    validateSSLSubscriptionPayment,
};
exports.default = PaymentServices;
