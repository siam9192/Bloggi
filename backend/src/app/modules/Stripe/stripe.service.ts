import config from "../../config";
const stripe = require("stripe")(config.stripe_secret);

async function createCheckoutSession(payload: {
  planName: string;
  amount: number;
  transactionId: string;
}) {
  const response = stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: payload.planName,
          },
          unit_amount: Math.round(payload.amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // The URL of your payment completion page
    success_url: config.payment.success_url,
    cancel_url: config.payment.cancel_url,
    metadata: {
      transactionId: payload.transactionId,
    },
  });

  return response;
}

const StripeServices = {
  createCheckoutSession,
};

export default StripeServices;
