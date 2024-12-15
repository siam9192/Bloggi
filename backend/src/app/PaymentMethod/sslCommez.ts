import config from "../config";
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
  };

  const sslcz = new SSL(store_id, store_passwd, is_live);
  const sslResponse = await sslcz.init(paymentData);
  let GatewayPageURL = sslResponse.GatewayPageURL;
  return GatewayPageURL;
};
