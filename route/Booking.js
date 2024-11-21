const bookingroute = require("express").Router();

const { verifyToken } = require("../controller/AuthController");

const { bookingpost, BookingGet, BookingStatus, BookingPayment, BookingPrice } = require("../controller/BookingController");

bookingroute.post("/booking-add", verifyToken, bookingpost)

bookingroute.get("/booking-get", BookingGet)

bookingroute.post("/booking-status", BookingStatus)

bookingroute.post("/update-price", BookingPrice)

bookingroute.post("/booking-payment", BookingPayment)

module.exports = bookingroute