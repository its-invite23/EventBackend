const StripeRoute = require("express").Router();
const { verifyToken } = require("../controller/AuthController");
const { createCheckout, PaymentGet } = require("../controller/StripeController");

StripeRoute.post("/create-checkout-session", createCheckout);

StripeRoute.get("/payment-get", PaymentGet);



module.exports = StripeRoute;