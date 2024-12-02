import { PackageDiscountType, PackageFeatureStatus } from "@prisma/client";

interface IFeature {
  name: string;
  status: `${PackageFeatureStatus}`;
}

export interface ICreatePackageData {
  name: string;
  price: number;
  discount: number;
  discount_type: `${PackageDiscountType}`;
  validity_days: number;
  features: IFeature[];
}
