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
const paginationHelper_1 = require("../../helpers/paginationHelper");
const function_1 = require("../../utils/function");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check parent category existence
    if (payload.parent_id) {
        const category = yield prisma_1.default.category.findUnique({
            where: {
                id: payload.parent_id,
            },
        });
        if (!category) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Parent category not found");
        }
    }
    let slug = (0, function_1.generateSlug)(payload.name);
    // Generate unique slug
    let counter = 1;
    do {
        const blog = yield prisma_1.default.category.findUnique({
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
        slug = (0, function_1.generateSlug)(payload.name + " " + counter);
    } while (true);
    const data = {
        name: payload.name,
        slug,
        image_url: payload.image_url,
        isFeatured: payload.is_featured,
    };
    if (payload.parent_id) {
        data.parent_id = payload.parent_id;
    }
    // Create parent category
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createdParentCategory = yield tx.category.create({
            data: data,
        });
        const children = payload.children;
        if (children && children.length) {
            // Create child categories of this category
            for (let i = 0; i < children.length; i++) {
                const item = children[i];
                let slug = (0, function_1.generateSlug)(item.name);
                // Generate unique slug
                let counter = 1;
                do {
                    const category = yield prisma_1.default.category.findUnique({
                        where: {
                            slug,
                        },
                        select: {
                            id: true,
                        },
                    });
                    if (!category) {
                        break;
                    }
                    counter++;
                    slug = (0, function_1.generateSlug)(item.name + " " + counter);
                } while (true);
                const data = Object.assign(Object.assign({}, item), { parent_id: createdParentCategory.id, slug });
                yield tx.category.create({
                    data,
                });
            }
        }
        return yield tx.category.findUnique({
            where: {
                id: createdParentCategory.id,
            },
            include: {
                children: true,
            },
        });
    }));
    return result;
});
const updateCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma_1.default.category.findUnique({
        where: {
            id: payload.id,
        },
    });
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found");
    }
    const data = Object.assign({}, payload);
    // If name has changed then generate new slug base on new name
    if (category.name !== payload.name) {
        let slug = (0, function_1.generateSlug)(payload.name);
        // Generate unique slug
        let counter = 1;
        do {
            const blog = yield prisma_1.default.category.findUnique({
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
            slug = (0, function_1.generateSlug)(payload.name + " " + counter);
        } while (true);
        data.slug = slug;
    }
    const result = yield prisma_1.default.category.update({
        where: {
            id: payload.id,
        },
        data,
    });
    return result;
});
const deleteCategoryByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    id = parseInt(id);
    // Check category existence
    const category = yield prisma_1.default.category.findUnique({
        where: {
            id,
        },
    });
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found");
    }
    yield prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return null;
});
const getCategoriesFromDB = (filterRequest, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterRequest, othersFilterData = __rest(filterRequest, ["searchTerm"]);
    const { limit, skip, page } = (0, paginationHelper_1.calculatePagination)(options);
    // If category parentId exist the typecast it number => string
    if (othersFilterData.parentId) {
        othersFilterData.parentId = Number(othersFilterData.parentId);
    }
    const andConditions = [];
    if (searchTerm) {
        const blogSearchableFields = ["name"];
        andConditions.push({
            OR: [
                ...blogSearchableFields.map((field) => ({
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                })),
            ],
        });
    }
    if (othersFilterData && Object.keys(othersFilterData).length) {
        andConditions.push({
            AND: Object.keys(othersFilterData).map((key) => ({
                [key]: {
                    equals: othersFilterData[key],
                },
            })),
        });
    }
    const whereConditions = {
        AND: andConditions,
    };
    const data = yield prisma_1.default.category.findMany({
        where: Object.assign({}, whereConditions),
        select: {
            id: true,
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
            name: true,
            slug: true,
        },
    });
    const processData = data.map((item) => {
        let str;
        const names = [];
        if (item.parent) {
            let loopParent = item.parent;
            while (loopParent) {
                names.push(loopParent.name);
                loopParent = loopParent.parent;
            }
        }
        str = [...names, item.name].join("/");
        return {
            id: item.id,
            name: item.name,
            slug: item.slug,
            hierarchyString: str,
        };
    });
    const total = yield prisma_1.default.category.count({
        where: whereConditions,
    });
    const meta = {
        page,
        limit,
        total,
    };
    return {
        meta,
        data: processData,
    };
});
const getPopularCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.$queryRaw `SELECT name,id FROM "categories" ORDER BY RANDOM() LIMIT 6`;
});
const getFeaturedCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.category.findMany({
        where: {
            is_featured: true,
        },
        include: {
            _count: {
                select: {
                    blogs: true,
                },
            },
        },
    });
});
const CategoryServices = {
    createCategoryIntoDB,
    getCategoriesFromDB,
    getPopularCategoriesFromDB,
    getFeaturedCategoriesFromDB,
    updateCategoryIntoDB,
    deleteCategoryByIdFromDB,
};
exports.default = CategoryServices;
