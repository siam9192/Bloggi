import { calculatePagination } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import prisma from "../../shared/prisma";
import { ICreatePlanPayload } from "./plan.interface";

const createPlanIntoDB = async (payload: ICreatePlanPayload) => {
  const { features, ...others_data } = payload;

  const result = await prisma.$transaction(async (tx) => {
    const createdPackageData = await tx.plan.create({
      data: others_data,
    });

    const createdFeaturesData = await tx.planFeature.createMany({
      data: features.map((ele) => ({
        ...ele,
        plane_id: createdPackageData.id,
      })),
    });
    return {
      ...createdPackageData,
      features: createdFeaturesData,
    };
  });
  return result;
};

const getPlansFromDB = async () => {
  return await prisma.plan.findMany({
    where: {
      name: {
        in: ["Basic", "Standard", "Premium"],
      },
    },
    include: {
      features: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

const getPlansForManageFromDB = async (paginationOptions:IPaginationOptions) => {
  const {page,skip,limit} = calculatePagination(paginationOptions);
  const data =  await prisma.plan.findMany({
    include: {
      features: true,
      _count:{
        select:{
          subscriptions:true
        }
      }
    },
    orderBy: {
      name: "asc",
    },
    take:limit,
    skip
  });
  

  const total  = await prisma.payment.count()

  const meta = {
    page,
    limit,
    total
  }
 
  return {
    data,
    meta
  }
};


const PlanServices = {
  createPlanIntoDB,
  getPlansFromDB,
  getPlansForManageFromDB
};

export default PlanServices;
