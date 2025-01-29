
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

const getPlansFromDB = async ()=>{
  return await prisma.plan.findMany({
    include:{
      features:true
    }
  })
}

const PlanServices = {
 createPlanIntoDB,
 getPlansFromDB
};

export default PlanServices;
