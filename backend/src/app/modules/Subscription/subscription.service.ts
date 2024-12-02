import { PaymentMethod } from "@prisma/client"
import AppError from "../../Errors/AppError"
import httpStatus from "../../shared/http-status"
import prisma from "../../shared/prisma"
import { IAuthUser } from "../Auth/auth.interface"
import { IPurchasePackageData } from "./subscription.interface"
import { stripePayment } from "../../PaymentMethod/stripePayment"
import { IPaymentMethodData } from "../../PaymentMethod/payment-method.interface"

const purchasePackage = async(authUser:IAuthUser,data:IPurchasePackageData)=>{
  
    const packageData = await prisma.package.findUnique({
        where:{
            id:data.package_id
        }
    })

    if(!packageData){
        throw new AppError(httpStatus.NOT_FOUND,"Package not found")
    }


  const user = await prisma.user.findUnique({
    where:{
        id:authUser.id
    },
    include:{
        subscriptions:{
            where:{
                payment:{
                    status:'Success'
                },
            },
            orderBy:{
                created_at:'desc'
            },
            take:1
        }
    },
  })
  if(!user){
    throw new AppError(httpStatus.BAD_REQUEST,"Something went wrong")
  }
  const latestSubscription = user?.subscriptions[0]
  if(latestSubscription){
    const subscriptionExpireAt = new Date(latestSubscription.expire_at).getTime()
    const today = new Date().getTime()
    if(subscriptionExpireAt >= today){
       throw new AppError(httpStatus.NOT_ACCEPTABLE,"Something went wrong")
    }
  }
  
//   Calculate package price
  const packagePrice = packageData.price - (packageData.discount_type === 'Fixed' ? packageData.discount:(packageData.discount/100)*packageData.price)

  let payment_url;
//   const paymentMethodData:IPaymentMethodData = {
//      service_name:packageData.name,

//   }
//   switch (data.method) {
//     case PaymentMethod.Stripe:
//          payment_url = stripePayment()
//         break;
  
//     default:
//         break;
//   }
}




const SubscriptionServices = {
    purchasePackage
}


export default SubscriptionServices