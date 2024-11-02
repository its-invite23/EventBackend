const StripeRoute = require("express").Router();
const { verifyToken } = require("../controller/AuthController");
const { createCheckout } = require("../controller/StripeController");

StripeRoute.post("/create-checkout-session", createCheckout);
// route.get("/myorders", validateToken, myorders);
// route.get("/allorder", validateToken, allorders);
// route.get("/order/:order_id", order_detail);
// route.get("/order-success/:order_id", payment_done);
// route.get("/order-cancel/:order_id", payment_cancel);

module.exports = StripeRoute;