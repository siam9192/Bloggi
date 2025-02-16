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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bycrypt_1 = require("../../utils/bycrypt");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const function_1 = require("../../utils/function");
const createStaffIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: data.email,
        },
    });
    //  Check user existence
    if (user) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "User us already exist on this email");
    }
    const hashPassword = yield (0, bycrypt_1.bcryptHash)(data.password);
    const result = yield prisma_1.default.$transaction((trClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            role: data.role,
            email: data.email,
            password: hashPassword,
            provider: client_1.Provider.Email,
        };
        //   Create user
        const userCreatedData = yield trClient.user.create({ data: userData });
        const userProfile = Object.assign(Object.assign({}, data.name), { profile_photo: "dee", user_id: userCreatedData.id });
        //  Create the user(Staff) profile
        const userCreatedProfile = yield trClient.staff.create({
            data: userProfile,
        });
        return Object.assign(Object.assign({}, userCreatedData), { profile: userCreatedProfile });
    }));
    return result;
});
const createAuthorIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: data.email,
        },
    });
    //  Check user existence
    if (user) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "User us already exist on this email");
    }
    const hashPassword = yield (0, bycrypt_1.bcryptHash)(data.password);
    const result = yield prisma_1.default.$transaction((trClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            role: client_1.UserRole.Author,
            email: data.email,
            password: hashPassword,
            provider: client_1.Provider.Email,
        };
        //   Create user
        const userCreatedData = yield trClient.user.create({ data: userData });
        const userProfile = Object.assign(Object.assign({}, data.name), { bio: data.bio, profile_photo: "dee", user_id: userCreatedData.id });
        //  Create the user(Author) profile
        const userCreatedProfile = yield trClient.author.create({
            data: userProfile,
        });
        const authorSocialLinks = data.social_links.map((ele) => (Object.assign(Object.assign({}, ele), { author_id: userCreatedProfile.id })));
        if (authorSocialLinks.length) {
            yield trClient.socialLink.createMany({
                data: authorSocialLinks,
            });
        }
        return Object.assign(Object.assign({}, userCreatedData), { profile: userCreatedProfile });
    }));
    return result;
});
const ChangeUserStatusIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: data.user_id,
            status: {
                not: "Deleted",
            },
        },
    });
    return yield prisma_1.default.user.update({
        where: {
            id: data.user_id,
        },
        data: {
            status: data.status,
        },
    });
});
const getUsersFromDB = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, startDate, endDate } = query, filterData = __rest(query, ["searchTerm", "startDate", "endDate"]);
    const { limit, skip, page } = (0, paginationHelper_1.calculatePagination)(options);
    const andConditions = [];
    if (filterData && Object.keys(filterData).length) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    if (startDate || endDate) {
        if (startDate &&
            (0, function_1.validateDate)(startDate) &&
            endDate &&
            (0, function_1.validateDate)(endDate)) {
            andConditions.push({
                join_date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            });
        }
        else if (startDate && (0, function_1.validateDate)(startDate)) {
            andConditions.push({
                join_date: {
                    gte: new Date(startDate),
                },
            });
        }
        else if (endDate && (0, function_1.validateDate)(endDate)) {
            andConditions.push({
                join_date: {
                    lte: new Date(endDate),
                },
            });
        }
    }
    const whereConditions = {
        AND: andConditions,
    };
    const users = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                join_date: "desc",
            },
        include: {
            reader: true,
            author: true,
            staff: true,
        },
    });
    const total = yield prisma_1.default.user.count({
        where: whereConditions,
    });
    const meta = {
        page,
        limit,
        total,
    };
    const data = users.map((user) => {
        const role = user.role;
        return {
            id: user.id,
            email: user.email,
            role,
            status: user.status,
            join_date: user.join_date,
            profile: role === "Author"
                ? user.author
                : role === "Reader"
                    ? user.reader
                    : user.staff,
        };
    });
    return {
        data,
        meta,
    };
});
const softDeleteUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check user existence
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: Number(userId),
            status: {
                not: "Deleted",
            },
        },
    });
    // Delete user
    yield prisma_1.default.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            status: "Deleted",
        },
    });
    return null;
});
const UserServices = {
    createStaffIntoDB,
    createAuthorIntoDB,
    ChangeUserStatusIntoDB,
    getUsersFromDB,
    softDeleteUserIntoDB,
};
exports.default = UserServices;
