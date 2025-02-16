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
const UpsertCommentReaction = (authUser, data) => __awaiter(void 0, void 0, void 0, function* () {
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
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Profile not found");
    }
    let result;
    if (data.type === null) {
        yield prisma_1.default.commentReaction.delete({
            where: {
                reader_id_comment_id: {
                    reader_id: reader.id,
                    comment_id: data.comment_id,
                },
            },
        });
        result = null;
    }
    else {
        result = yield prisma_1.default.commentReaction.upsert({
            where: {
                reader_id_comment_id: {
                    reader_id: reader.id,
                    comment_id: data.comment_id,
                },
            },
            update: {
                type: data.type,
            },
            create: {
                reader_id: reader.id,
                comment_id: data.comment_id,
                type: data.type,
            },
        });
    }
    return result;
});
const getMyCommentReactionsFromDB = (authUser, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    // Type cast blogId  string => number
    blogId = Number(blogId);
    return yield prisma_1.default.commentReaction.findMany({
        where: {
            comment: {
                reader: {
                    user_id: authUser.id,
                },
                blog_id: blogId,
            },
        },
        select: {
            comment_id: true,
            type: true,
        },
    });
});
const CommentReactionServices = {
    UpsertCommentReaction,
    getMyCommentReactionsFromDB,
};
exports.default = CommentReactionServices;
