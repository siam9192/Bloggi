"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const stripe = require("stripe")(config_1.default.stripe_secret);
function createCheckoutSession(payload) {
    return __awaiter(this, void 0, void 0, function* () {
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
            success_url: config_1.default.payment.success_url,
            cancel_url: config_1.default.payment.cancel_url,
            metadata: {
                transactionId: payload.transactionId,
            },
        });
        return response;
    });
}
const StripeServices = {
    createCheckoutSession,
};
exports.default = StripeServices;
