const StripeRoute = require("express").Router();
const { createCheckout, PaymentGet, PaymentSuccess, PaymentCancel, PaymentGetId, PaymentGetByID } = require("../controller/StripeController");


StripeRoute.post("/create-checkout-session", createCheckout);

StripeRoute.get("/payment-get", PaymentGet);

// StripeRoute.get("/retrieve-payment/:sessionId", PaymentId);

StripeRoute.get("/payment-success/:srNo", PaymentSuccess)

StripeRoute.get("/payment-cancel/:srNo", PaymentCancel)


StripeRoute.get("/getByID/:booking_id", PaymentGetByID)

// StripeRoute.post("/payment-filter", PaymentFilter);


module.exports = StripeRoute;