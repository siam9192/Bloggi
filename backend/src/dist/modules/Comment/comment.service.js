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
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const http_status_1 = __importDefault(require("../../shared/http-status"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createCommentIntoDB = (authUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_1.default.blog.findUnique({
        where: {
            id: data.blog_id,
        },
    });
    // Check blog existence
    if (!blog)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    const reader = yield prisma_1.default.reader.findUnique({
        where: {
            user_id: authUser.id,
        },
        select: {
            id: true,
        },
    });
    if (!reader) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Profile not found");
    }
    return yield prisma_1.default.comment.create({
        data: {
            blog_id: data.blog_id,
            content: data.content,
            reader_id: reader.id,
        },
    });
});
const createCommentReplayIntoDB = (authUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield prisma_1.default.comment.findUnique({
        where: {
            id: data.comment_id,
        },
    });
    const reader = yield prisma_1.default.reader.findUnique({
        where: {
            user_id: authUser.id,
        },
    });
    if (!reader) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Profile not found");
    }
    // Check blog existence
    if (!comment)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    return yield prisma_1.default.comment.create({
        data: {
            blog_id: comment.blog_id,
            content: data.content,
            reader_id: reader === null || reader === void 0 ? void 0 : reader.id,
            parent_id: comment.id,
        },
    });
});
const getBlogCommentsFromDB = (blogId, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Typecast blogId string => number
    blogId = Number(blogId);
    const { limit, skip, page, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const whereConditions = {
        blog_id: blogId,
        parent: null,
    };
    const comments = yield prisma_1.default.comment.findMany({
        where: whereConditions,
        take: limit,
        skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            reader: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    profile_photo: true
                }
            },
            _count: {
                select: {
                    replies: true,
                    reactions: {
                        where: {
                            type: "Like",
                        },
                    },
                },
            },
        },
    });
    // const commentReactions = await prisma.commentReaction.groupBy({
    //   by:['comment_id','type'],
    //   _count:{
    //     comment_id:true
    //   }
    //   });
    //   console.log(commentReactions)
    const total = yield prisma_1.default.comment.count({
        where: whereConditions,
    });
    const data = comments.map(comment => {
        const { reader } = comment, othersData = __rest(comment, ["reader"]);
        return Object.assign(Object.assign({}, othersData), { reader: {
                id: reader.id,
                full_name: [reader.first_name, reader.last_name].join(" "),
                profile_photo: reader.profile_photo
            } });
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
const getBlogCommentRepliesFromDB = (comment_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Typecast comment string => number
    comment_id = Number(comment_id);
    const whereConditions = {
        parent_id: comment_id,
    };
    const comments = yield prisma_1.default.comment.findMany({
        where: whereConditions,
        include: {
            reader: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    profile_photo: true
                }
            },
            _count: {
                select: {
                    replies: true,
                    reactions: {
                        where: {
                            type: "Like",
                        },
                    },
                },
            },
        },
    });
    const data = comments.map(comment => {
        const { reader } = comment, othersData = __rest(comment, ["reader"]);
        return Object.assign(Object.assign({}, othersData), { reader: {
                full_name: [reader.first_name, reader.last_name].join(" "),
                profile_photo: reader.profile_photo
            } });
    });
    return data;
});
const deleteCommentFromDB = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    // Typecase string=>number
    commentId = Number(commentId);
    return yield prisma_1.default.comment.delete({
        where: {
            id: commentId,
        },
    });
});
const updateCommentIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.comment.update({
        where: {
            id: data.comment_id,
        },
        data: {
            content: data.content,
        },
    });
});
const CommentServices = {
    createCommentIntoDB,
    createCommentReplayIntoDB,
    getBlogCommentsFromDB,
    getBlogCommentRepliesFromDB,
    deleteCommentFromDB,
    updateCommentIntoDB,
};
exports.default = CommentServices;
