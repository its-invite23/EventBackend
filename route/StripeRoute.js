const StripeRoute = require("express").Router();
const { verifyToken } = require("../controller/AuthController");
const { createCheckout, PaymentGet, PaymentSuccess, PaymentCancel } = require("../controller/StripeController");


StripeRoute.post("/create-checkout-session", createCheckout);

StripeRoute.get("/payment-get", PaymentGet);

StripeRoute.get("/payment-success/:srNo", PaymentSuccess)

StripeRoute.get("/payment-cancel/:srNo", PaymentCancel)


module.exports = StripeRoute;