import { PaymentMethod } from "@prisma/client";

export interface IPurchasePackageData {
    method:`${PaymentMethod}`,
    package_id:number
}