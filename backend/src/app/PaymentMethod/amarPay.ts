//Fill formData with your own data
import axios from "axios";
import { IPaymentMethodData } from "./payment-method.interface";

export const amarPayPayment = async (data: IPaymentMethodData) => {
  const paymentData = {
    cus_name: "any",
    cus_email: "any@gmail.com",
    cus_phone: "014764654443",
    amount: data.amount,
    tran_id: data.transaction_id,
    signature_key: "28c78bb1f45112f5d40b956fe104645100",
    store_id: "aamarpay",
    currency: "USD",
    desc: "Pay your bill",
    cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    success_url: data.success_url,
    fail_url: data.fail_url,
    cancel_url: data.cancel_url,
    type: "json", //This is must required for JSON request
  };
  const { data: resData } = await axios.post(
    "https://secure.aamarpay.com/jsonpost.php",
    paymentData,
  );

  return resData.payment_url;
};
