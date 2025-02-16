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
const prisma_1 = __importDefault(require("../../shared/prisma"));
const client_1 = require("@prisma/client");
const profile_validation_1 = __importDefault(require("./profile.validation"));
const getUserProfileByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user if user not exist then throw user not found error
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: Number(id),
        },
        include: {
            author: {
                include: {
                    social_links: true,
                    _count: {
                        select: {
                            followers: true,
                            blogs: true,
                        },
                    },
                },
            },
            reader: {
                include: {
                    _count: {
                        select: {
                            following: true,
                            comments: true,
                        },
                    },
                },
            },
            staff: true,
        },
    });
    const userRole = user.role;
    let result;
    if (userRole === "Reader") {
        const profile = user.reader;
        if (profile) {
            result = {
                email: user.email,
                role: user.role,
                first_name: profile.first_name,
                last_name: profile.last_name,
                profile_photo: profile.profile_photo,
                count: Object.assign({}, profile._count),
                status: user.status,
                join_date: user.join_date,
            };
        }
    }
    else if (userRole === "Author") {
        const profile = user.author;
        if (profile) {
            result = {
                email: user.email,
                role: user.role,
                name: {
                    first: profile.first_name,
                    last: profile.last_name,
                },
                bio: profile.bio,
                profile_photo: profile.profile_photo,
                social_links: profile.social_links,
                count: Object.assign({}, profile._count),
                status: user.status,
                join_date: user.join_date,
            };
        }
    }
    else {
        const profile = user.staff;
        if (profile) {
            result = {
                email: user.email,
                role: user.role,
                name: {
                    first: profile.first_name,
                    last: profile.last_name,
                },
                profile_photo: profile.profile_photo,
                status: user.status,
                join_date: user.join_date,
            };
        }
    }
    return result;
});
const updateMyProfileIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const role = user.role;
    // Check user existence
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: Number(user.id),
        },
    });
    const userId = Number(user.id);
    let result;
    if (role === client_1.UserRole.Reader) {
        const data = req.body;
        profile_validation_1.default.UpdateReaderProfileValidation.parse(data);
        result = yield prisma_1.default.reader.update({
            where: {
                user_id: userId,
            },
            data: data,
        });
    }
    else if (role === client_1.UserRole.Author) {
        const authorData = yield prisma_1.default.author.findUniqueOrThrow({
            where: {
                user_id: userId,
            },
        });
        profile_validation_1.default.UpdateAuthorProfileValidation.parse(req.body);
        const _a = req.body, { social_links } = _a, data = __rest(_a, ["social_links"]);
        result = prisma_1.default.$transaction((trClient) => __awaiter(void 0, void 0, void 0, function* () {
            if (data) {
                yield trClient.author.update({
                    where: {
                        user_id: userId,
                    },
                    data,
                });
            }
            // If social link exist
            if (social_links && social_links.length) {
                // Filter deleted social links
                const deletedSocialLinks = social_links.filter((ele) => ele.is_deleted === true);
                // Filter updated social links
                const updatedSocialLinks = social_links.filter((ele) => ele.is_deleted === false ||
                    ele.is_deleted === undefined ||
                    ele.is_new_added === false ||
                    ele.is_new_added === undefined);
                // If deleted social links exits then delete the social links from DB
                if (deletedSocialLinks.length) {
                    for (const link of deletedSocialLinks) {
                        yield trClient.socialLink.delete({
                            where: {
                                author_id_platform: {
                                    author_id: authorData.id,
                                    platform: link.platform,
                                },
                            },
                        });
                    }
                }
                // If updated social links exists then upsert the social links into DB
                if (updatedSocialLinks.length) {
                    for (const link of social_links) {
                        yield trClient.socialLink.upsert({
                            where: {
                                author_id_platform: {
                                    author_id: authorData.id,
                                    platform: link.platform,
                                },
                            },
                            update: {
                                url: link.url,
                            },
                            create: {
                                author_id: authorData.id,
                                platform: link.platform,
                                url: link.url,
                            },
                        });
                    }
                }
            }
            return yield trClient.author.findUnique({
                where: {
                    user_id: userId,
                },
                include: {
                    social_links: true,
                },
            });
        }));
    }
    // Update staff data
    else {
        const data = req.body;
        profile_validation_1.default.UpdateStaffProfileValidation.parse(data);
        result = yield prisma_1.default.staff.updateMany({
            where: {
                user_id: userId,
            },
            data,
        });
    }
    return result;
});
const ProfileServices = {
    getUserProfileByIdFromDB,
    updateMyProfileIntoDB,
};
exports.default = ProfileServices;
