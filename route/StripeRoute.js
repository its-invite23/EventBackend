const StripeRoute = require("express").Router();
const { createCheckout, PaymentGet, PaymentSuccess, PaymentCancel, PaymentId, PaymentGetId, PaymentFilter } = require("../controller/StripeController");


StripeRoute.post("/create-checkout-session", createCheckout);

StripeRoute.get("/payment-get", PaymentGet);

StripeRoute.get("/retrieve-payment/:sessionId", PaymentId);

StripeRoute.get("/payment-success/:srNo", PaymentSuccess)

StripeRoute.get("/payment-cancel/:srNo", PaymentCancel)

StripeRoute.post("/payment-filter", PaymentFilter);


module.exports = StripeRoute;