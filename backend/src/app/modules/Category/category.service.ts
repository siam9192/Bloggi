import prisma from "../../shared/prisma";
import { ICreateCategoryData } from "./category.interface";

const createCategoryIntoDB = async (data: ICreateCategoryData) => {
  return await prisma.category.create({
    data: data,
  });
};

const getCategoriesFromDB = async (data: ICreateCategoryData) => {
  return await prisma.category.findMany({
    include: {},
  });
};

const CategoryServices = {
  createCategoryIntoDB,
  getCategoriesFromDB,
};

export default CategoryServices;
