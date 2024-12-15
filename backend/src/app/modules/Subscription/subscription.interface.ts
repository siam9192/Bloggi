import { PaymentMethod } from "@prisma/client";

export interface IPurchasePackagePayload {
  method: `${PaymentMethod}`;
  package_id: number;
}
