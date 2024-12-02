import { Package } from "@prisma/client";
import { ICreatePackageData } from "./package.interface";
import prisma from "../../shared/prisma";

const createPackageIntoDB = async (data: ICreatePackageData) => {
  const { features, ...others_data } = data;

  const result = await prisma.$transaction(async (tx) => {
    const createdPackageData = await tx.package.create({
      data: others_data,
    });

    const createdFeaturesData = await tx.packageFeature.createMany({
      data: features.map((ele) => ({
        ...ele,
        package_id: createdPackageData.id,
      })),
    });
    return {
      ...createdPackageData,
      features: createdFeaturesData,
    };
  });
  return result;
};

const getPackagesFromDB = async () => {
  return await prisma.package.findMany({
    include: {
      features: true,
    },
  });
};

const PackageServices = {
  createPackageIntoDB,
  getPackagesFromDB,
};

export default PackageServices;
