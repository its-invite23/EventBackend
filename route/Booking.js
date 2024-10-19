 const enquire = require("express").Router();

const { verifyToken } = require("../controller/AuthController");

const { bookingpost, BookingGet } = require("../controller/BookingController");

enquire.post("/booking-add", verifyToken, bookingpost)

enquire.get("/booking-get", BookingGet)



module.exports = enquire