const  Booking = require("../model/Booking");


const catchAsync = require("../utils/catchAsync");


exports.bookingpost = catchAsync(async (req, res) => {
    const userId = req?.User?._id;

    if (!userId) {
        return res.status(400).json({
            status: false,
            message: "User information not found in the request or userId is undefined.",
        });
    }

    const { PackageId, bookingDate, location, status } = req.body;

    try {
        const record = new Booking({
            PackageId,
            bookingDate,
            location,
            status,
            userId
        });

        await record.save();

        return res.status(201).json({
            status: true,
            message: "Booking successfully created!",
            data: record,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while creating the booking.",
            error: error.message,
        });
    }
});



exports.BookingGet = catchAsync(async (req, res, next) => {
    try {
        const Bookingget = await Booking.find({});
        res.status(200).json({
            status: true,
            data: Bookingget,
            msg: "Bookings retrieved successfully.",
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Failed to fetch bookings.",
            error: error.message,
        });
    }
});
