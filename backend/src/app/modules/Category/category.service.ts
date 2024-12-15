import { Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import prisma from "../../shared/prisma";
import {
  ICategoryFilterRequest,
  ICreateCategoryPayload,
} from "./category.interface";
import { calculatePagination } from "../../helpers/paginationHelper";
import { generateSlug } from "../../utils/function";

const createCategoryIntoDB = async (payload: ICreateCategoryPayload) => {
  const data = {
    ...payload,
    slug:generateSlug(payload.name)
  }


  return await prisma.category.create({
    data:data,
  });
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
    where: whereConditions,
    select: {
      id: true,
      name: true,
      _count: true,
    },
    skip,
    take: limit,
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
    data,
  };
};

const getPopularCategoriesFromDB = async () => {
  return await prisma.$queryRaw`SELECT name,id FROM "categories" ORDER BY RANDOM() LIMIT 6`;
};

const CategoryServices = {
  createCategoryIntoDB,
  getCategoriesFromDB,
  getPopularCategoriesFromDB,
};

export default CategoryServices;
