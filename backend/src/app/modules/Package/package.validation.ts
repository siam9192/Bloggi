import { PackageDiscountType, PackageFeatureStatus } from "@prisma/client";
import { z } from "zod";

const CreateFeature = z.object({
    name:z.string(),
    status:z.enum(Object.values(PackageFeatureStatus) as [string, ...string[]])
})

const CreatePackage = z.object({
  name:z.string(),
  price:z.number(),
  discount:z.number(),
  discount_type:z.enum(Object.values(PackageDiscountType) as [string, ...string[]]),
  validity_days:z.number(),
  features:z.array(CreateFeature)
})



const PackageValidations = {
    CreatePackage
}

export default PackageValidations