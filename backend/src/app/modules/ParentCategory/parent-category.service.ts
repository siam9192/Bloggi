import prisma from "../../shared/prisma";
import { ICreateParentCategory } from "./parent-category.interface";

const createParentCategoryIntoDB = async (data: ICreateParentCategory) => {
  return await prisma.parentCategory.create({
    data,
  });
};

const getParentCategoriesFromDB = async () => {
  return await prisma.parentCategory.findMany({
    include: {
      child_categories: true,
    },
  });
};

const ParentCategoryServices = {
  createParentCategoryIntoDB,
  getParentCategoriesFromDB,
};

export default ParentCategoryServices;
