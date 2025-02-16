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
const prisma_1 = __importDefault(require("../../shared/prisma"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const blog_constant_1 = require("./blog.constant");
const function_1 = require("../../utils/function");
const createBlogIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const authorData = yield prisma_1.default.author.findUniqueOrThrow({
        where: {
            user_id: userId,
        },
    });
    const { tags } = payload, othersBlogData = __rest(payload, ["tags"]);
    // Check category existence
    yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: othersBlogData.category_id,
        },
    });
    let slug = (0, function_1.generateSlug)(payload.title);
    // Generate unique slug
    let counter = 1;
    do {
        const blog = yield prisma_1.default.blog.findUnique({
            where: {
                slug,
            },
            select: {
                id: true,
            },
        });
        if (!blog) {
            break;
        }
        counter++;
        slug = (0, function_1.generateSlug)(payload.title + " " + counter);
    } while (true);
    const result = yield prisma_1.default.$transaction((trClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        othersBlogData.publish_date = new Date(othersBlogData.publish_date);
        // Create blog
        const createdBlog = yield trClient.blog.create({
            data: Object.assign(Object.assign({ author_id: authorData.id }, othersBlogData), { slug }),
        });
        if (tags && tags.length) {
            const tags = (_a = payload.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => ({
                name: tag,
                blog_id: createdBlog.id,
            }));
            // Create blog tags
            const createdBlogs = yield trClient.blogTag.createMany({
                data: tags,
            });
        }
        return Object.assign({}, createdBlog);
    }));
    return result;
});
const getBlogByIdFromDB = (authUser, id) => __awaiter(void 0, void 0, void 0, function* () {
    id = Number(id);
    const blog = yield prisma_1.default.blog.findUnique({
        where: {
            id,
        },
        include: {
            _count: true,
            tags: true,
            category: {
                include: {
                    parent: {
                        include: {
                            parent: {
                                include: {
                                    parent: {
                                        include: {
                                            parent: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    if (!blog)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "blog not found");
    if (authUser.role === client_1.UserRole.Author &&
        authUser.authorId !== (blog === null || blog === void 0 ? void 0 : blog.author_id)) {
        throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, "Bad Gatway!");
    }
    let str;
    const names = [];
    if (blog.category.parent) {
        let loopParent = blog.category.parent;
        while (loopParent) {
            names.push(loopParent.name);
            loopParent = loopParent.parent;
        }
    }
    str = [...names, blog.category.name].join("/");
    const data = blog;
    data.category.hierarchyString = str;
    return blog;
});
const getBlogsFromDB = (authUser, filter, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, categories, type, startDate, endDate } = filter;
    const { limit, skip, page } = (0, paginationHelper_1.calculatePagination)(options);
    const andConditions = [];
    if (categories) {
        const categorySlugs = categories.split(",");
        if (categorySlugs.length) {
            andConditions.push({
                category: {
                    slug: {
                        in: categorySlugs,
                    },
                },
            });
        }
    }
    if (searchTerm) {
        const blogSearchableFields = ["title", "short_description"];
        andConditions.push({
            OR: [
                ...blogSearchableFields.map((field) => ({
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                })),
                {
                    tags: {
                        some: {
                            name: {
                                contains: searchTerm,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ],
        });
    }
    if (startDate || endDate) {
        if (startDate &&
            (0, function_1.validateDate)(startDate) &&
            endDate &&
            (0, function_1.validateDate)(endDate)) {
            andConditions.push({
                created_at: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            });
        }
        else if (startDate && (0, function_1.validateDate)(startDate)) {
            andConditions.push({
                created_at: {
                    gte: new Date(startDate),
                },
            });
        }
        else if (endDate && (0, function_1.validateDate)(endDate)) {
            andConditions.push({
                created_at: {
                    lte: new Date(endDate),
                },
            });
        }
    }
    if (type && ["premium", "free"].includes(type)) {
        andConditions.push({
            is_premium: type === "free" ? false : true,
        });
    }
    const whereConditions = {
        AND: andConditions,
        privacy_status: client_1.BlogPrivacyStatus.Public,
    };
    const blogs = yield prisma_1.default.blog.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                publish_date: "desc",
            },
        include: {
            author: {
                select: {
                    first_name: true,
                    last_name: true,
                    profile_photo: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            tags: true,
        },
    });
    let bookmarkedBlogsId = [];
    if (authUser) {
        const blogsId = yield prisma_1.default.bookmark.findMany({
            where: {
                user_id: authUser.id,
            },
            select: {
                blog_id: true,
            },
        });
        bookmarkedBlogsId = blogsId.map((item) => item.blog_id);
    }
    const data = blogs.map((item) => {
        const author = item.author;
        return {
            title: item.title,
            short_description: item.short_description,
            featured_image: item.featured_image,
            slug: item.slug,
            likes_count: item.likes_count,
            dislikes_count: item.dislikes_count,
            category: {
                id: item.category.id,
                name: item.category.name,
                slug: item.category.slug,
            },
            author: {
                full_name: author.first_name + " " + author.last_name,
                profile_photo: author.profile_photo,
            },
            is_premium: item.is_premium,
            publish_date: item.publish_date,
            created_at: item.created_at,
            is_bookmarked: bookmarkedBlogsId.includes(item.id),
        };
    });
    const total = yield prisma_1.default.blog.count({
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
const getBlogForReadBySlugFromDB = (authUser, slug) => __awaiter(void 0, void 0, void 0, function* () {
    // Find blog by slug
    const blog = yield prisma_1.default.blog.findUnique({
        where: {
            slug,
        },
        include: {
            author: {
                select: {
                    first_name: true,
                    last_name: true,
                    profile_photo: true,
                    _count: {
                        select: {
                            followers: true,
                        },
                    },
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            tags: true,
        },
    });
    //  Check blog existence
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    let isBookmarked = false;
    let reactionType;
    // Check is user role is reader and is the blog is premium
    if (authUser && authUser.role === client_1.UserRole.Reader) {
        const reader = yield prisma_1.default.reader.findUnique({
            where: {
                user_id: authUser.id,
            },
        });
        if (!reader)
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Something went wrong");
        if (blog.is_premium) {
            const currentSubscription = yield prisma_1.default.subscription.findFirst({
                where: {
                    reader: {
                        user_id: authUser.id,
                    },
                    start_at: {
                        gt: new Date(),
                    },
                    end_at: {
                        lt: new Date(),
                    },
                    status: "Active",
                },
            });
            if (!currentSubscription) {
                throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "This is premium content.It only for premium members");
            }
        }
        const bookmarkedBlog = yield prisma_1.default.bookmark.findUnique({
            where: {
                blog_id_user_id: {
                    blog_id: blog.id,
                    user_id: authUser.id,
                },
            },
            select: {
                blog_id: true,
            },
        });
        if (bookmarkedBlog)
            isBookmarked = true;
        if (authUser.readerId) {
            const readerReaction = yield prisma_1.default.blogReaction.findUnique({
                where: {
                    blog_id_reader_id: {
                        blog_id: blog.id,
                        reader_id: authUser.readerId
                    }
                },
                select: {
                    type: true
                }
            });
            if (readerReaction)
                reactionType = readerReaction.type;
        }
        // Upsert blog history
        yield prisma_1.default.blogReadHistory.upsert({
            where: {
                reader_id_blog_id: {
                    reader_id: reader.id,
                    blog_id: blog.id,
                },
            },
            create: {
                reader_id: reader.id,
                blog_id: blog.id,
            },
            update: {
                count: {
                    increment: 1,
                },
            },
        });
    }
    // Increment  blog view (+1)
    yield prisma_1.default.blog.update({
        where: {
            id: blog.id,
        },
        data: {
            views_count: {
                increment: 1,
            },
        },
    });
    const { author } = blog, othersData = __rest(blog, ["author"]);
    const data = Object.assign(Object.assign({}, othersData), { author: {
            full_name: [author.first_name, author.last_name].join(" "),
            profile_photo: author.profile_photo,
            followers_count: author._count.followers,
        }, reaction_type: reactionType || null, is_bookmarked: isBookmarked });
    return data;
});
const getMyBlogsFromDB = (authUser, filterOptions, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, categories, type, startDate, endDate } = filterOptions, otherFilterOptions = __rest(filterOptions, ["searchTerm", "categories", "type", "startDate", "endDate"]);
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const andConditions = [
        {
            author: {
                user_id: authUser.id,
            },
        },
    ];
    if (categories) {
        const categoryIds = categories
            .split(",")
            .map((id) => Number(id))
            .filter((id) => typeof id === "number");
        if (categoryIds.length) {
            andConditions.push({
                category_id: {
                    in: categoryIds,
                },
            });
        }
    }
    if (searchTerm) {
        const blogSearchableFields = ["title", "short_description"];
        andConditions.push({
            OR: [
                ...blogSearchableFields.map((field) => ({
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                })),
                {
                    tags: {
                        some: {
                            name: {
                                contains: searchTerm,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ],
        });
    }
    Object.entries(otherFilterOptions).forEach(([key, value]) => {
        andConditions.push({
            [key]: value,
        });
    });
    if (type && ["premium", "free"].includes(type)) {
        andConditions.push({
            is_premium: type === "free" ? false : true,
        });
    }
    if (startDate || endDate) {
        if (startDate &&
            (0, function_1.validateDate)(startDate) &&
            endDate &&
            (0, function_1.validateDate)(endDate)) {
            andConditions.push({
                created_at: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            });
        }
        else if (startDate && (0, function_1.validateDate)(startDate)) {
            andConditions.push({
                created_at: {
                    gte: new Date(startDate),
                },
            });
        }
        else if (endDate && (0, function_1.validateDate)(endDate)) {
            andConditions.push({
                created_at: {
                    lte: new Date(endDate),
                },
            });
        }
    }
    const whereConditions = {
        AND: andConditions,
    };
    const blogs = yield prisma_1.default.blog.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                publish_date: "desc",
            },
        include: {
            category: {
                select: {
                    name: true,
                },
            },
            _count: true,
        },
    });
    const data = (0, blog_constant_1.blogsResultFormat)(blogs);
    const total = yield prisma_1.default.blog.count({
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
const getBlogsForManageFromDB = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, categories, startDate, endDate, status, type } = query;
    const { limit, skip, page } = (0, paginationHelper_1.calculatePagination)(options);
    const andConditions = [];
    if (categories) {
        const categorySlugs = categories.split(",");
        if (categorySlugs.length) {
            andConditions.push({
                category: {
                    slug: {
                        in: categorySlugs,
                    },
                },
            });
        }
    }
    if (searchTerm) {
        const blogSearchableFields = ["title", "short_description"];
        andConditions.push({
            OR: [
                ...blogSearchableFields.map((field) => ({
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                })),
                {
                    tags: {
                        some: {
                            name: {
                                contains: searchTerm,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ],
        });
    }
    if (status && Object.values(client_1.BlogStatus).includes(status)) {
        andConditions.push({
            status,
        });
    }
    if (type && ["premium", "free"].includes(type)) {
        andConditions.push({
            is_premium: type === "free" ? false : true,
        });
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
    const whereConditions = {
        AND: andConditions,
    };
    const data = yield prisma_1.default.blog.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                publish_date: "desc",
            },
        include: {
            author: {
                select: {
                    first_name: true,
                    last_name: true,
                    profile_photo: true,
                },
            },
            category: {
                select: {
                    name: true,
                },
            },
            tags: true,
        },
    });
    const result = data.map((item) => {
        const author = item.author;
        return {
            title: item.title,
            short_description: item.short_description,
            featured_image: item.featured_image,
            slug: item.slug,
            likes_count: item.likes_count,
            dislikes_count: item.dislikes_count,
            category: item.category.name,
            author: {
                full_name: author.first_name + " " + author.last_name,
                profile_photo: author.profile_photo,
            },
            created_at: item.created_at,
        };
    });
    const total = yield prisma_1.default.blog.count({
        where: whereConditions,
    });
    const meta = {
        page,
        limit,
        total,
    };
    return {
        data: result,
        meta,
    };
});
const updateBlogByIdFromDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Typecast the id string => number
    id = Number(id);
    const blog = yield prisma_1.default.blog.findUnique({
        where: {
            id: id,
        },
        include: {
            author: {
                select: {
                    first_name: true,
                    last_name: true,
                    profile_photo: true,
                },
            },
        },
    });
    //  Check blog existence
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    const { deleted_tags, new_tags } = data, others_data = __rest(data, ["deleted_tags", "new_tags"]);
    yield prisma_1.default.$transaction((txClient) => __awaiter(void 0, void 0, void 0, function* () {
        if (deleted_tags && deleted_tags.length) {
            yield txClient.blogTag.deleteMany({
                where: {
                    id: {
                        in: deleted_tags,
                    },
                },
            });
        }
        if (new_tags && new_tags.length) {
            yield txClient.blogTag.createMany({
                data: new_tags.map((tag) => ({
                    blog_id: id,
                    name: tag,
                })),
            });
        }
        if (others_data.category_id) {
            yield txClient.category.findUniqueOrThrow({
                where: {
                    id: others_data.category_id,
                },
            });
        }
        yield txClient.blog.update({
            where: {
                id,
            },
            data: others_data,
        });
        return yield txClient.blog.findUnique({
            where: {
                id,
            },
            include: {
                tags: true,
            },
        });
    }));
});
const deleteBlogByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Typecast the id string => number
    id = Number(id);
    yield prisma_1.default.blog.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return yield prisma_1.default.blog.delete({
        where: {
            id,
        },
    });
});
const getRecentBlogsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield prisma_1.default.blog.findMany({
        where: {
            publish_date: {
                lte: new Date(),
            },
            status: "Published",
        },
        include: {
            author: true,
            category: {
                select: {
                    name: true,
                },
            },
        },
        take: 12,
        orderBy: {
            publish_date: "desc",
        },
    });
    const result = (0, blog_constant_1.blogsResultFormat)(blogs);
    return result;
});
const getTrendingBlogsFromDB = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    // Typecast category id string => number
    categoryId = Number(categoryId);
    console.log(categoryId);
    const whereConditions = {
        publish_date: {
            lte: new Date(),
        },
        status: "Published",
    };
    if (categoryId && typeof categoryId === "number") {
        whereConditions.category_id = categoryId;
    }
    const blogs = yield prisma_1.default.blog.findMany({
        where: whereConditions,
        include: {
            author: {
                select: {
                    first_name: true,
                    last_name: true,
                    profile_photo: true,
                },
            },
            category: {
                select: {
                    name: true,
                },
            },
        },
        take: 12,
        orderBy: {
            views_count: "desc",
        },
    });
    const result = (0, blog_constant_1.blogsResultFormat)(blogs);
    return result;
});
const getRelatedBlogsFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_1.default.blog.findUnique({
        where: {
            slug,
        },
        include: {
            tags: true,
            category: {
                select: {
                    id: true,
                },
            },
        },
    });
    if (!blog)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    const blogs = yield prisma_1.default.blog.findMany({
        where: {
            OR: [
                {
                    category: {
                        id: blog.category.id,
                    },
                },
                {
                    tags: {
                        some: {
                            name: {
                                in: blog.tags.map((item) => item.name),
                            },
                        },
                    },
                },
            ],
            id: {
                not: blog.id,
            },
        },
        include: {
            author: {
                select: {
                    first_name: true,
                    last_name: true,
                    profile_photo: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            tags: true,
        },
        take: 6,
    });
    const data = blogs.map((item) => {
        const author = item.author;
        return {
            title: item.title,
            short_description: item.short_description,
            featured_image: item.featured_image,
            slug: item.slug,
            likes_count: item.likes_count,
            dislikes_count: item.dislikes_count,
            category: {
                id: item.category.id,
                name: item.category.name,
                slug: item.category.slug,
            },
            author: {
                full_name: author.first_name + " " + author.last_name,
                profile_photo: author.profile_photo,
            },
            is_premium: item.is_premium,
            publish_date: item.publish_date,
            created_at: item.created_at,
        };
    });
    return data;
});
const getBlogAnalyzingDataFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    id = Number(id);
    const blog = yield prisma_1.default.blog.findUnique({
        where: {
            id,
        },
    });
    if (!blog)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
});
const getBlogStatesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    id = Number(id);
    const blog = yield prisma_1.default.blog.findUnique({
        where: {
            id,
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            _count: {
                select: {
                    comments: true,
                },
            },
        },
    });
    if (!blog)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "blog not found");
    const data = {
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        category: blog.category,
        total_views: blog.views_count,
        total_likes: blog.likes_count,
        total_dislikes: blog.dislikes_count,
        total_comments: blog._count.comments,
    };
    return data;
});
const BlogServices = {
    createBlogIntoDB,
    getBlogsFromDB,
    getBlogByIdFromDB,
    getBlogForReadBySlugFromDB,
    getRelatedBlogsFromDB,
    deleteBlogByIdFromDB,
    updateBlogByIdFromDB,
    getMyBlogsFromDB,
    getBlogsForManageFromDB,
    getRecentBlogsFromDB,
    getTrendingBlogsFromDB,
    getBlogStatesFromDB,
};
exports.default = BlogServices;
