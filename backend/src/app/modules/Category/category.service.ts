import { Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import prisma from "../../shared/prisma";
import {
  ICategoryFilterRequest,
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "./category.interface";
import { calculatePagination } from "../../helpers/paginationHelper";
import { generateSlug } from "../../utils/function";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";

const createCategoryIntoDB = async (payload: ICreateCategoryPayload) => {
  // Check parent category existence
  if (payload.parent_id) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.parent_id,
      },
    });
    if (!category) {
      throw new AppError(httpStatus.NOT_FOUND, "Parent category not found");
    }
  }

  let slug = generateSlug(payload.name);
  // Generate unique slug
  let counter = 1;
  do {
    const blog = await prisma.category.findUnique({
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
    slug = generateSlug(payload.name + " " + counter);
  } while (true);

  const data: any = {
    name: payload.name,
    slug,
    image_url: payload.image_url,
    isFeatured: payload.is_featured,
  };

  if (payload.parent_id) {
    data.parent_id = payload.parent_id;
  }

  // Create parent category
  const result = await prisma.$transaction(async (tx) => {
    const createdParentCategory = await tx.category.create({
      data: data,
    });

    const children = payload.children;
    if (children && children.length) {
      // Create child categories of this category
      for (let i = 0; i < children.length; i++) {
        const item = children[i];
        let slug = generateSlug(item.name);

        // Generate unique slug
        let counter = 1;
        do {
          const category = await prisma.category.findUnique({
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
          slug = generateSlug(item.name + " " + counter);
        } while (true);

        const data = {
          ...item,
          parent_id: createdParentCategory.id,
          slug,
        };

        await tx.category.create({
          data,
        });
      }
    }

    return await tx.category.findUnique({
      where: {
        id: createdParentCategory.id,
      },
      include: {
        children: true,
      },
    });
  });

  return result;
};

const updateCategoryIntoDB = async (payload: IUpdateCategoryPayload) => {
  const category = await prisma.category.findUnique({
    where: {
      id: payload.id,
    },
  });
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  const data: any = {
    ...payload,
  };

  // If name has changed then generate new slug base on new name
  if (category.name !== payload.name) {
    let slug = generateSlug(payload.name);
    // Generate unique slug
    let counter = 1;
    do {
      const blog = await prisma.category.findUnique({
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
      slug = generateSlug(payload.name + " " + counter);
    } while (true);

    data.slug = slug;
  }

  const result = await prisma.category.update({
    where: {
      id: payload.id,
    },
    data,
  });

  return result;
};

const deleteCategoryByIdFromDB = async (id: string | number) => {
  id = parseInt(id as string);
  // Check category existence
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  await prisma.category.delete({
    where: {
      id,
    },
  });
  return null;
};

const getCategoriesFromDB = async (
  filterRequest: ICategoryFilterRequest,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...othersFilterData } = filterRequest;
  const { limit, skip, page } = calculatePagination(options);

  // If category parentId exist the typecast it number => string
  if (othersFilterData.parentId) {
    othersFilterData.parentId = Number(othersFilterData.parentId);
  }

  const andConditions: Prisma.CategoryWhereInput[] = [];

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
          equals: (othersFilterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.CategoryWhereInput = {
    AND: andConditions,
  };

  const data = await prisma.category.findMany({
    where: {
      ...whereConditions,
    },
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
    const names: string[] = [];
    if (item.parent) {
      let loopParent: any = item.parent;
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

  const total = await prisma.category.count({
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
};

const getPopularCategoriesFromDB = async () => {
  return await prisma.$queryRaw`SELECT name,id FROM "categories" ORDER BY RANDOM() LIMIT 6`;
};

const getFeaturedCategoriesFromDB = async () => {
  return await prisma.category.findMany({
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
};

const CategoryServices = {
  createCategoryIntoDB,
  getCategoriesFromDB,
  getPopularCategoriesFromDB,
  getFeaturedCategoriesFromDB,
  updateCategoryIntoDB,
  deleteCategoryByIdFromDB,
};

export default CategoryServices;
