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
const paginationHelper_1 = require("../../helpers/paginationHelper");
const http_status_1 = __importDefault(require("../../shared/http-status"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createBookmarkIntoDB = (authUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_1.default.blog.findUnique({
        where: {
            id: data.blog_id,
        },
    });
    //    Check blog existence
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    const isAdded = yield prisma_1.default.bookmark.count({
        where: {
            user_id: authUser.id,
            blog_id: blog.id,
        },
    });
    if (isAdded) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Already added");
    }
    return yield prisma_1.default.bookmark.create({
        data: {
            user_id: authUser.id,
            blog_id: data.blog_id,
        },
    });
});
const deleteBookmarkFromDB = (authUser, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    // Typecast blog id string => number
    blogId = Number(blogId);
    return yield prisma_1.default.bookmark.delete({
        where: {
            blog_id_user_id: {
                blog_id: blogId,
                user_id: authUser.id,
            },
        },
    });
});
const getMyBookmarksFromDB = (authUser, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, paginationHelper_1.calculatePagination)(options);
    const whereConditions = {
        user_id: authUser.id,
    };
    const data = yield prisma_1.default.bookmark.findMany({
        where: whereConditions,
        include: {
            blog: {
                select: {
                    title: true,
                    short_description: true,
                    featured_image: true,
                    likes_count: true,
                    dislikes_count: true,
                    views_count: true,
                    author: {
                        select: {
                            first_name: true,
                            last_name: true,
                            profile_photo: true,
                        },
                    },
                },
            },
        },
        take: limit,
        skip,
        orderBy: {
            created_at: "desc",
        },
    });
    const total = yield prisma_1.default.bookmark.count({
        where: whereConditions,
    });
    return {
        data,
        meta: {
            total,
            limit,
            page,
        },
    };
});
const checkBookmarkStatusFromDB = (authUser, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    blogId = parseInt(blogId);
    const bookmark = yield prisma_1.default.bookmark.findFirst({
        where: {
            blog_id: blogId,
            user_id: authUser.id,
        },
    });
    const status = bookmark ? true : false;
    return {
        status,
    };
});
const BookmarkServices = {
    createBookmarkIntoDB,
    deleteBookmarkFromDB,
    getMyBookmarksFromDB,
    checkBookmarkStatusFromDB,
};
exports.default = BookmarkServices;
