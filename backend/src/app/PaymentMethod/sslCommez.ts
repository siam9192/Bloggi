import config from "../config";
import AppError from "../Errors/AppError";
import httpStatus from "../shared/http-status";
import { IPaymentMethodData } from "./payment-method.interface";
const SSL = require("sslcommerz-lts");

export const sslcommerzPayment = async (data: IPaymentMethodData) => {
  const store_id = config.ssl_store_id;
  const store_passwd = config.ssl_store_password;
  const is_live = false; //true for live, false for sandbox

  const paymentData = {
    total_amount: data.amount,
    currency: "USD",
    tran_id: data.transaction_id, // use unique tran_id for each api call
    success_url: data.success_url,
    fail_url: data.cancel_url,
    cancel_url: data.cancel_url,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: null,
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSL(store_id, store_passwd, is_live);
  const sslResponse = await sslcz.init(paymentData);
  let GatewayPageURL = await sslResponse.GatewayPageURL;
  if (!GatewayPageURL)
    throw new AppError(httpStatus.BAD_REQUEST, sslResponse.failedReason);
  console.log(sslResponse);
  return GatewayPageURL;
};
